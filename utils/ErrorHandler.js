// Generate error objects
class ErrorHandler{
    // For 400
    static badRequest(message = ''){
        return {
            error: 'Bad Request',
            status: 400,
            message: message
        }
    }
    // For 404
    static notFound(msg = 'Not Found'){
        return {
            error: 'Not Found',
            status: 404,
            message: msg
        }
    }    
    // For 401
    static unauthorized(){
        return {
            error: 'Unauthorized',
            status: 401,
            message: 'Unauthorized'
        }
    }       
    // For 403
    static forbidden(){
        return {
            error: 'Forbidden',
            status: 403,
            message: 'Forbidden'
        }
    }     
}
module.exports = ErrorHandler