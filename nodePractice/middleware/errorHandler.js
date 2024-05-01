const errorhandler = (err, req, res, next) => {
    console.log(err, req, res , 'response')
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode).json({
        mesage: err.message,
        stackTrace: err.stack
    })
}

export default errorhandler



