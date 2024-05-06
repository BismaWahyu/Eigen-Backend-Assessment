const schemas = require('./schemas/index');
const paths = require('./paths/index');

const apiDocs = {
    "definition": {
        "openapi": "3.0.0",
        "info": {
            "title": "Eigen Backend Assessment",
            "description": "Assessment API documentation",
            "version": "1.0.0"
        },
        "servers": [
            {"url": "http://localhost:8080/api/v1"}, // local url
            // add production url here
        ],
        "components": {
            "schemas": {...schemas},           
        },
        "paths": {...paths}
    },
    "apis": ["./routes/*.js"],
}

module.exports = apiDocs;