const MemberService = require('./MemberService');

exports.list = async(req, res) => {
    try{
        const { error, data } = await MemberService.list();
        res.send(data); 
    }catch(err){
        res.status(500).send(err);
    }
}

exports.borrow = async(req, res) => {
    try{
        const { error, data } = await MemberService.borrow(req);
        
        if(error){
            return res.status(error.status).send(error)
        }
        res.status(201).send(data)
    }catch(err){
        res.status(500).send(err)
    }
}

exports.returnBook = async(req, res) => {
    try{
        const { error, data } = await MemberService.returnBook(req);

        if(error){
            return res.status(error.status).send(error)
        }
        res.status(201).send(data)
    }catch(err){
        res.status(500).send(err);
    }
}