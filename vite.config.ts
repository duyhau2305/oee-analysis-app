import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/form/Khu_vực_sản_xuất.xlsx',
          dest: 'public/form',
        },
      ],
    }),
  ],
  assetsInclude: ['**/*.xlsx'],

  esbuild: {
    jsxFragment: 'Fragment',
    jsxFactory: 'React.createElement'
  },
  server: {
    host: '0.0.0.0',
    port: 9999,
    strictPort: true,
   },
  
})
