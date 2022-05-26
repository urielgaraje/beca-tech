const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.join(__dirname, 'index.html'),
      },
    },
  },
});
