/**
 * File managing configuration for the application
 * */
const dotenv = require('dotenv');
const fs = require('fs');

if (fs.existsSync('.env')) {
  dotenv.load();
}

const defaults = {
  PORT: '3000', // server's port
  API_THROTTLE: '30000', // allowed time in milliseconds between requests
  ENABLE_CUSTOM_RANKS: 'false',
};
// ensure that process.env has all values in defaults, but prefer the process.env value
Object.keys(defaults).forEach((key) => {
  process.env[key] = (key in process.env) ? process.env[key] : defaults[key];
});

// now processes can use either process.env or config
module.exports = process.env;
