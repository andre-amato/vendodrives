const { defineConfig } = require('cypress')
const vitePreprocessor = require('cypress-vite')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
    },
    baseUrl: 'http://localhost:3000',
    supportFile: false
  }
})
