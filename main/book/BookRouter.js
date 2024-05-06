const bookRouter = require('express').Router();
const BookController = require('./BookController');

bookRouter.get('/books', BookController.list);

module.exports = bookRouter;