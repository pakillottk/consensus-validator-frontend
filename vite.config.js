import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react({ include: /\.[jt]sx?$/ })],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  resolve: {
    alias: {
      'react-currency-formatter': path.resolve(__dirname, 'src/shims/react-currency-formatter.js'),
      'base64-img': path.resolve(__dirname, 'src/shims/base64-img.js'),
      'react-csv': path.resolve(__dirname, 'node_modules/react-csv/lib/index.js')
    }
  }
});
