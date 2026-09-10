import path from 'path'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { brotliCompressSync, constants } from 'node:zlib'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

/**
 * Pre-compress emitted text assets with Brotli (max quality) so the static
 * host can serve `.br` files directly. Originals are kept for clients or
 * proxies without Brotli support. Zero dependencies — uses node:zlib.
 *
 * NOTE: Brotli is intentionally NOT a second vite-plugin-compression
 * instance — that package keeps a module-level mtime cache, so the second
 * instance in the same build sees every file as already compressed and
 * silently emits nothing. Gzip goes through vite-plugin-compression,
 * Brotli through this plugin; both honor threshold 1024.
 */
function brotliStatic(threshold = 1024): Plugin {
  const filter = /\.(js|css|html|svg|json)$/i
  return {
    name: 'brotli-static',
    apply: 'build',
    closeBundle() {
      const walk = (dir: string): void => {
        for (const entry of readdirSync(dir)) {
          const full = join(dir, entry)
          if (statSync(full).isDirectory()) {
            walk(full)
            continue
          }
          if (!filter.test(full) || full.endsWith('.br')) continue
          const size = statSync(full).size
          if (size < threshold) continue
          const compressed = brotliCompressSync(readFileSync(full), {
            params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
          })
          writeFileSync(`${full}.br`, compressed)
          console.log(
            `brotli: ${full} ${(size / 1024).toFixed(1)}kB → ${(compressed.length / 1024).toFixed(1)}kB`,
          )
        }
      }
      walk('dist')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    // Pre-compressed bytes for hosts that serve them (gzip + brotli).
    // @ts-expect-error vite-plugin-compression ships CJS-style types; default import is callable at runtime
    compression({ algorithm: 'gzip', threshold: 1024 }),
    brotliStatic(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Keep heavy vendors out of the critical-path entry chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          const p = id.replace(/\\/g, '/')
          if (/motion|framer-motion/.test(p)) return 'motion'
          if (/\/lenis\//.test(p)) return 'lenis'
          if (/lucide-react|@radix-ui|radix-ui|@base-ui/.test(p))
            return 'ui-vendor'
          if (/react-router/.test(p)) return 'router'
          if (/\/react\/|\/react-dom\/|\/scheduler\//.test(p)) return 'react'
          // NOTE: no manual chunk for @tanstack/react-query/axios — forcing
          // them into their own chunk duplicates the React CJS runtime into
          // it (mixed CJS/ESM interop), which the entry then statically
          // imports. Default code-splitting keeps a single React copy and
          // folds query/axios into the lazy chunks that use them.
          return undefined
        },
      },
    },
  },
})
