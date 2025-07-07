import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    dts({ 
      include: ['src/**/*'],
      exclude: ['src/main.tsx', 'src/App.tsx', 'src/App.css', 'src/index.css'],
      outDir: 'dist',
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.build.json'
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SnapTableReact',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'mobx', 'mobx-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          mobx: 'mobx',
          'mobx-react': 'mobxReact'
        }
      }
    }
  }
})
