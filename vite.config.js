import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react'

// deploy 빌드 설정
const deployConfig = defineConfig({
    plugins: [react()],
    base: '/poke-type-calc-extension/',
    build: {
        outDir: 'dist-deploy'
    }
});

// extensions 빌드 설정
const extensionsConfig = defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        outDir: 'dist'
    }
});
export default defineConfig(({mode}) => {

    // extensions 빌드 설정
    if (mode === 'extensions') {
        return extensionsConfig;
    }

    // deploy 빌드 설정
    if (mode === 'deploy') {
        return deployConfig;
    }
    return deployConfig;
});
