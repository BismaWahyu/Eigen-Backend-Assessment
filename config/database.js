require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            useUTC: true,
            typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
                return field.string()
            }
            
            return next();
            },
        },
        timezone: '+07:00',
        logging: false,
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            useUTC: true,
            typeCast: function (field, next) {
                if (field.type === 'DATETIME') {
                return field.string()
                }
                
                return next();
            },
        },
        timezone: '+07:00',
        logging: false,
    },
    production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
        useUTC: true,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
            return field.string()
            }
            
            return next();
        },
        },
    timezone: '+07:00',
    logging: false,
    }
}