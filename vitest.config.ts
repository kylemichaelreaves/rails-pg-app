import {defineConfig} from 'vitest/config'
import path from 'node:path'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./spec/javascript/components/setupTests.ts'],
        include: [
            'spec/javascript/components/**/__tests__/**/*.{js,jsx,ts,tsx}',
            'spec/javascript/components/**/*.{spec,test}.{js,jsx,ts,tsx}',
            'spec/javascript/contexts/**/*.{spec,test}.{js,jsx,ts,tsx}',
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'spec/',
                '**/*.d.ts',
            ],
        },
        testTimeout: 10000,
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'app/javascript'),
            '@': path.resolve(__dirname, 'app/javascript'),
        },
    },
})
