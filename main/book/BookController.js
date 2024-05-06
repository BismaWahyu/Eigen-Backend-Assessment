const BookService = require('./BookService');

exports.list = async(req, res) => {
    try{
        const { error, data } = await BookService.list();

        res.send(data)
    }catch(err){
        throw err;
    }
}