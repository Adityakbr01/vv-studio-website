import path from 'path'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { brotliCompressSync, constants } from 'node:zlib'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'

/**
 * Pre-compress emitted text assets with Brotli (max quality) so the static
 * host can serve `.br` files directly. Originals are kept for clients or
 * proxies without Brotli support. Zero dependencies — uses node:zlib.
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
    // Brotli pre-compression for faster delivery of JS/CSS/HTML.
    brotliStatic(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
