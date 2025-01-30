import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: "/urban-octo-garbanzo",
    plugins: [plugin()],
    server: {
        port: 52621,
    }
})