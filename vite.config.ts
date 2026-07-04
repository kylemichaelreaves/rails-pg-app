/** @type {import('vite').UserConfig} */
import {defineConfig} from 'vite'
import path from 'node:path'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
    // App env vars are read via import.meta.env.VITE_* (Vite's native prefix),
    // so the old vite-plugin-env-compatible (REACT_APP_ shim) is no longer needed.
    plugins: [
        RubyPlugin(),
        react(),
        tsconfigPaths(),
        svgrPlugin(),
        FullReload([
            'config/routes.rb',
            'app/controllers/**/*',
        ])
    ],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "app/javascript"),
        }
    },
    server: {
        port: 3000,
    },
    build: {
        outDir: 'build',
        sourcemap: true,
    },
})
