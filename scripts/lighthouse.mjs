#!/usr/bin/env node
/**
 * Lighthouse audit runner for vite preview.
 * - Auto-starts `vite preview` if target URL unreachable (Windows-compat spawn with shell:true)
 * - Runs mobile and/or desktop form factors with proper screenEmulation
 * - Saves html+json to lighthouse-reports/, prints bars + key metrics
 * - Exits non-zero if any category < --threshold (default 85)
 *
 * Usage:
 *   node scripts/lighthouse.mjs [--url=http://localhost:4173] [--form-factor=mobile|desktop|both] [--threshold=85]
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const pref = `--${name}=`;
  const hit = args.find((a) => a.startsWith(pref));
  if (hit) return hit.slice(pref.length);
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--')) return args[idx + 1];
  return fallback;
};

const TARGET_URL = getArg('url', process.env.LH_URL || 'http://localhost:4173');
const FORM_FACTOR_ARG = getArg('form-factor', 'both');
const THRESHOLD = Number(getArg('threshold', '85'));

const FACTORS =
  FORM_FACTOR_ARG === 'both' ? ['mobile', 'desktop'] : [FORM_FACTOR_ARG];
if (!FACTORS.every((f) => f === 'mobile' || f === 'desktop')) {
  console.error(`Invalid --form-factor=${FORM_FACTOR_ARG} (use mobile|desktop|both)`);
  process.exit(2);
}

const REPORT_DIR = 'lighthouse-reports';
mkdirSync(REPORT_DIR, { recursive: true });

const targetPort = (() => {
  try {
    return Number(new URL(TARGET_URL).port) || 4173;
  } catch {
    return 4173;
  }
})();

async function isReachable(url, timeoutMs = 2500) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    return res.ok || res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

async function waitForUrl(url, maxMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    if (await isReachable(url)) return true;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

function bar(score) {
  // score 0..1 → 20-char bar
  const filled = Math.round(score * 20);
  return '█'.repeat(filled) + '░'.repeat(20 - filled);
}

function fmtMs(v) {
  if (v == null) return 'n/a';
  return `${Math.round(v)}ms`;
}

async function runFactor(factor) {
  // Defensive CJS/ESM interop for chrome-launcher.
  const m = await import('chrome-launcher');
  const launcher = m.default ?? m;
  const { default: lighthouse } = await import('lighthouse');

  const chrome = await launcher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  try {
    const screenEmulation =
      factor === 'mobile'
        ? {
            mobile: true,
            width: 412,
            height: 823,
            deviceScaleFactor: 2.625,
            disabled: false,
          }
        : {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          };

    const result = await lighthouse(
      TARGET_URL,
      {
        port: chrome.port,
        output: ['html', 'json'],
        formFactor: factor,
        screenEmulation,
      },
      undefined,
    );

    if (!result) throw new Error('Lighthouse returned no result');

    // result.report is an ARRAY when output is ["html","json"]: index 0→html, 1→json.
    const reports = Array.isArray(result.report) ? result.report : [result.report];
    const [htmlReport, jsonReport] = reports;

    const htmlPath = join(REPORT_DIR, `lighthouse-${factor}.html`);
    const jsonPath = join(REPORT_DIR, `lighthouse-${factor}.json`);
    if (typeof htmlReport === 'string') writeFileSync(htmlPath, htmlReport);
    const jsonStr = typeof jsonReport === 'string' ? jsonReport : JSON.stringify(jsonReport);
    writeFileSync(jsonPath, jsonStr);
    const lhr = typeof jsonReport === 'string' ? JSON.parse(jsonReport) : result.lhr;

    const cats = lhr.categories ?? {};
    const scores = {
      performance: (cats.performance?.score ?? 0) * 100,
      accessibility: (cats.accessibility?.score ?? 0) * 100,
      'best-practices': (cats['best-practices']?.score ?? 0) * 100,
      seo: (cats.seo?.score ?? 0) * 100,
    };

    const audits = lhr.audits ?? {};
    const metrics = {
      FCP: audits['first-contentful-paint']?.numericValue,
      LCP: audits['largest-contentful-paint']?.numericValue,
      TBT: audits['total-blocking-time']?.numericValue,
      CLS: audits['cumulative-layout-shift']?.numericValue,
      SI: audits['speed-index']?.numericValue,
    };

    console.log(`\n===== Lighthouse (${factor}) → ${TARGET_URL} =====`);
    for (const [k, v] of Object.entries(scores)) {
      console.log(`${k.padEnd(15)} ${Math.round(v).toString().padStart(3)} ${bar(v / 100)}`);
    }
    console.log(
      `FCP ${fmtMs(metrics.FCP)} | LCP ${fmtMs(metrics.LCP)} | TBT ${fmtMs(metrics.TBT)} | CLS ${Number(metrics.CLS ?? 0).toFixed(3)} | SI ${fmtMs(metrics.SI)}`,
    );
    console.log(`Reports: ${htmlPath}, ${jsonPath}`);

    // Top insights: render-blocking, LCP breakdown, unused-JS, cache TTL.
    const insights = [];
    const pushAudit = (id, label) => {
      const a = audits[id];
      if (!a) return;
      const savings = a.details?.overallSavingsMs != null ? ` (saves ~${Math.round(a.details.overallSavingsMs)}ms)` : '';
      insights.push(`${label}: ${a.title ?? id}${savings} [score ${(a.score ?? 0)}]`);
    };
    pushAudit('render-blocking-resources', 'render-blocking');
    pushAudit('largest-contentful-paint-element', 'LCP-element');
    pushAudit('unused-javascript', 'unused-JS');
    pushAudit('uses-long-cache-ttl', 'cache-TTL');
    pushAudit('bootup-time', 'bootup-time');
    pushAudit('uses-responsive-images', 'responsive-images');
    if (insights.length) {
      console.log('Top insights:');
      for (const line of insights.slice(0, 7)) console.log(`  - ${line}`);
    }
    // LCP element detail (node selector) for image work.
    const lcpEl = audits['largest-contentful-paint-element']?.details?.items?.[0];
    if (lcpEl) {
      console.log(`LCP node: ${lcpEl.node?.snippet ?? lcpEl.node?.selector ?? JSON.stringify(lcpEl).slice(0, 300)}`);
    }

    return { factor, scores, metrics };
  } finally {
    try {
      await chrome.kill();
    } catch {
      /* kill() may return undefined or throw after exit — ignore */
    }
  }
}

let previewProc = null;
try {
  const reachable = await isReachable(TARGET_URL);
  if (!reachable) {
    console.log(`Target ${TARGET_URL} unreachable — starting vite preview...`);
    // shell:true for Windows compat.
    previewProc = spawn('npx', ['vite', 'preview', '--port', String(targetPort), '--strictPort'], {
      shell: true,
      stdio: 'inherit',
    });
    const ok = await waitForUrl(TARGET_URL, 30000);
    if (!ok) {
      console.error(`vite preview did not become ready at ${TARGET_URL} within 30s`);
      process.exit(2);
    }
    console.log(`vite preview ready at ${TARGET_URL}`);
  }

  const results = [];
  for (const f of FACTORS) {
    results.push(await runFactor(f));
  }

  let failed = false;
  for (const r of results) {
    for (const [k, v] of Object.entries(r.scores)) {
      if (v < THRESHOLD) {
        console.error(`FAIL: ${r.factor}/${k} = ${Math.round(v)} < threshold ${THRESHOLD}`);
        failed = true;
      }
    }
  }
  if (failed) {
    console.error(`\nThreshold ${THRESHOLD} not met.`);
    process.exit(1);
  } else {
    console.log(`\nAll categories ≥ ${THRESHOLD}.`);
  }
} finally {
  if (previewProc) {
    try {
      previewProc.kill();
    } catch {
      /* ignore */
    }
  }
}
