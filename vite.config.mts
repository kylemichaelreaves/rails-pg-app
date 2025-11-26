/** @type {import('vite').UserConfig} */
import {defineConfig} from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import FullReload from 'vite-plugin-full-reload';
import path from "node:path";


export default defineConfig({
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
            "@": path.resolve(__dirname, "app/javascript"),
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

