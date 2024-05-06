const express = require('express');
const env = process.env.NODE_ENV || 'development';
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const appConfig = require('./config/app.js');
const apiDocs = require('./config/api-docs/apiDocs');
const router = require('./routes/index');
const app = express();

const server = require('http').createServer(app);

if(env !== 'production'){
    app.use( cors({ credentials: true }) )
}else{
    app.use( cors({ origin: '*' }) )
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup( swaggerJsDoc(apiDocs) ));

// Router
app.use('/api/v1', router);
app.get('/', (req, res) => {
    res.redirect(302, '/api-docs');
});

server.listen(appConfig.port, () => {
    console.log('Server started at port '+appConfig.port);
});

module.exports = server