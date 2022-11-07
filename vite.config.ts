/** @type {import('vite').UserConfig} */
import {defineConfig} from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from "vite-plugin-env-compatible";
import FullReload from 'vite-plugin-full-reload';

const path = require("path");
const ENV_PREFIX = "REACT_APP_";

export default defineConfig({
    plugins: [
        RubyPlugin(),
        react(),
        tsconfigPaths(),
        svgrPlugin(),
        envCompatible({prefix: ENV_PREFIX}),
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
        outDir: 'public',
        sourcemap: true,
    },
})
