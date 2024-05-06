require('dotenv').config();

module.exports = {
    port: process.env.APP_PORT,
    env: process.env.NODE_ENV
}