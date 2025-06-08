class ResponseHandler {
    success(data = null, message = 'Success', statusCode = 200) {
        return { message, data, statusCode }
    }

    error(message = 'Error occurred', statusCode = 500) {
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    }
}

module.exports = ResponseHandler;