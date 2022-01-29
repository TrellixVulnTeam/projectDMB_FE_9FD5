const path = require('path');

// import .env variables
if (!process.env.NODE_ENV) {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/.env'),
    sample: path.join(__dirname, './env/.env'),
  });

} else if (process.env.NODE_ENV === 'production') {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/production.env'),
    sample: path.join(__dirname, './env/.env'),
  });

} else {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/.env'),
    sample: path.join(__dirname, './env/.env'),
  });
}

module.exports = {
  NODE: process.env.NODE_PARTY_PROFILE,
  APP_NAME: process.env.APP_NAME,
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SERVICE: {
    RECRUITMENT: {
      NAME: process.env.SERVICE_RECRUITMENT_NAME,
      API: process.env.SERVICE_RECRUITMENT_API,
      IP: process.env.SERVICE_RECRUITMENT_IP
    },
  },
  LOG: {
    ROOT_PATH: process.env.LOG_ROOT_PATH
  }
};
