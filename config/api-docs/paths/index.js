const members = require('./members_paths.json');
const books = require('./books_paths.json');

const paths = {
    ...members, ...books
}

module.exports = paths;