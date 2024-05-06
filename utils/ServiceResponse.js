const ErrorHandler = require('../utils/ErrorHandler')

class ServiceResponse{
    static success = (data) => {
        return {error: null, data: data}
    }
    static badRequest = (errMsg, data = null) => {
        return {
            error: ErrorHandler.badRequest(errMsg), 
            data: data
        }
    }       
    static notFound = (msg = 'Not Found') => {
        return {
            error: ErrorHandler.notFound(msg), 
            data: null
        }
    }    
}
module.exports = ServiceResponse