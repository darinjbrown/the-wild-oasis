import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { jsx } from 'react/jsx-runtime';

export default defineConfig({
	plugins: [react({ include: /\.(js|jsx)$/ }), eslint()],
});
