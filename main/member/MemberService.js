const { Op, where } = require('sequelize');
const models  = require('../../models/index');
const ServiceResponse = require('../../utils/ServiceResponse');
const Member = models.Member;

Member.hasMany(models.BorrowedBooks, { foreignKey: 'member_id' });
models.BorrowedBooks.belongsTo(models.Book, { foreignKey: 'book_id' });

class MemberService {
    static list = async(req) => {
        try{
            let members = await Member.findAll({
                include: [
                    {
                        model: models.BorrowedBooks,
                        attributes: ['code', 'borrowed_date', 'returned_date'],
                        include: [
                            {
                                model: models.Book,
                                attributes: ['code', 'title', 'author'],
                            }
                        ],
                        group: ['BorrowedBooks.code']
                    }
                ],
            });

            return ServiceResponse.success(members)
        }catch(err){
            throw err;
        }
    }

    static borrow = async(req) => {
        try{
            // check if member not in penalty status
            const member = await Member.findOne({
                where: {
                    code: req.body.member_id
                }
            })
            
            if(member.is_penalty){
                let currentDate = new Date();
                let penaltyDate = new Date(member.penalty_date);
                if (currentDate < penaltyDate) {
                    return ServiceResponse.badRequest({
                        status: 'fail',
                        msg: `Member is in penalty status, will be able to borrow after ${member.penalty_date}`
                    });
                }
            }

            // prevent member to borrow more than 2 books
            if(req.body.books.length > 2){
                return ServiceResponse.success({
                    status: 'fail',
                    msg: "You only can borrow 2 book or less"
                })
            }

            let randomNumber = Math.floor(Math.random() * 9999) + 1;

            let failBorrow = false;
            let borrowedBooks;
            await Promise.all(req.body.books.map(async (item) => {
                let book = await models.Book.findOne({
                    where: { code: item }
                });

                borrowedBooks = await models.BorrowedBooks.findAll({
                    attributes: ['book_id'],
                    where: {
                        [Op.or]: [
                            {book_id: item},
                            {returned_date: {[Op.not]: null}}
                        ]
                    }
                })

                if(borrowedBooks.length > 0){
                    failBorrow = true;
                }else{
                    await models.BorrowedBooks.create({
                        code: "BRW-"+randomNumber,
                        member_id: req.body.member_id,
                        book_id: book.code,
                        borrowed_date: req.body.borrowed_date,
                        returned_date: null,
                        created_at: new Date(),
                        updated_at: new Date()
                    })
                }
                
            }));

            if(failBorrow){
                return ServiceResponse.success({
                    msg: "All or some book not available",
                    item: borrowedBooks
                })
            }else{
                return ServiceResponse.success({
                    msg: "Enjoy your book, have a nice day!",
                })
            }

        }catch(err){
            throw err;
        }
    }

    static returnBook = async(req) => {
        try{
            const borrowedBooks = await models.BorrowedBooks.findOne({
                where: {
                    member_id: req.body.member_id,
                    book_id: req.body.book_id
                }
            })

            if(!borrowedBooks){
                return ServiceResponse.success({
                    msg: "Books is not borrowed by this member",
                })
            }


            let borrowedDate = new Date(borrowedBooks.borrowed_date);
            let returnedDate = new Date(borrowedDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            let currentDate = new Date();
            
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth();
            let day = currentDate.getDate();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();

            let formatedCurrentDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            
            // borrowedBooks.returned_date = formatedCurrentDate;
            // await borrowedBooks.save();
            
            if (currentDate > returnedDate) {
                const member = await Member.findOne({
                    where: {
                        code: req.body.member_id
                    }
                })
                let penaltyDate = new Date(currentDate);
                penaltyDate.setDate(penaltyDate.getDate() + 3);

                member.is_penalty = true;
                member.penalty_date = penaltyDate;
                await member.save();
                return ServiceResponse.success({
                    msg: 'Returned date is over than 7 days from borrowed date.',
                    borrowedBooks
                })
            }


            return ServiceResponse.success({
                msg: 'Thank you!',
                borrowedBooks
            })

        }catch(err){
            throw err;
        }
    }
}

module.exports = MemberService