const { Op } = require('sequelize');
const models = require('../../models/index');
const ServiceResponse = require('../../utils/ServiceResponse');
const Book = models.Book;

class BookService {
    static list = async(req) => {
        try{
            let books = await Book.findAll({
                include: [
                    {
                        model: models.BorrowedBooks,
                        required: false,
                        attributes: ['code']
                    }
                ],
                where: {
                    [Op.or]: [
                        { '$BorrowedBooks.code$': null },
                        { '$BorrowedBooks.returned_date$': { [Op.not]: null } }
                    ]
                }
            });

            books.forEach((book) => {
                delete book.dataValues.BorrowedBooks;
            });

            return ServiceResponse.success(books)
        }catch(err){
            throw err;
        }
    }
}

module.exports = BookService;