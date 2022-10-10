import {defineConfig} from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from "vite-plugin-env-compatible";

const path = require("path");

const ENV_PREFIX = "REACT_APP_";

export default defineConfig({
    plugins: [
        RubyPlugin(),
        react(),
        viteTsconfigPaths(),
        svgrPlugin(),
        envCompatible({prefix: ENV_PREFIX})

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
    }
})
