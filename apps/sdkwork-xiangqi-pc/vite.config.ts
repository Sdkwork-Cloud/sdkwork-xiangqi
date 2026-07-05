import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

const XIANGQIAppSdkRoot = path.resolve(
  __dirname,
  '../../sdks/sdkwork-xiangqi-app-sdk/sdkwork-xiangqi-app-sdk-typescript/src/index.ts',
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.SDKWORK_ACCESS_TOKEN': JSON.stringify(env.SDKWORK_ACCESS_TOKEN ?? ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        '@sdkwork-internal/xiangqi-app-sdk-generated': path.resolve(
          XIANGQIAppSdkRoot,
          'src/index.ts',
        ),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/app/v3/api': {
          target: env.VITE_xiangqi_API_BASE_URL ?? 'http://127.0.0.1:8098',
          changeOrigin: true,
        },
      },
    },
  };
});
