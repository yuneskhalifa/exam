const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    apiUrl: 'https://turbo-memory-x5r7xvr6vpg26q5x-8080.app.github.dev', // 👈 Environment variable for API calls inside tests
  },
  e2e: {
    baseUrl: 'https://turbo-memory-x5r7xvr6vpg26q5x-3000.app.github.dev', // 👈 Base URL that Cypress will visit when running tests
    setupNodeEvents(on, config) {
      // 👈 Empty for now; you can set event listeners if needed (optional)
    },
    supportFile: false, // 👈 No support file (some projects have a support file for global hooks)
  },
});
