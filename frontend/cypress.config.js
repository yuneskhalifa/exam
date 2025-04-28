const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    apiUrl: 'http://localhost:8080', // 👈 Environment variable for API calls inside tests
  },
  e2e: {
    baseUrl: 'http://localhost:3000', // 👈 Base URL that Cypress will visit when running tests
    setupNodeEvents(on, config) {
      // 👈 Empty for now; you can set event listeners if needed (optional)
    },
    supportFile: false, // 👈 No support file (some projects have a support file for global hooks)
  },
});
