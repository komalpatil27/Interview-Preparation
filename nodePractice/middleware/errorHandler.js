const errorhandler = (err, req, res, next) => {
    console.log(err, req, res , 'response')
    const statusCode = res.statusCode ? res.statusCode : 500
    let error  ={
        mesage: err.message,
        stackTrace: err.stack
    }
    switch(statusCode){
        case 400:
            res.status(400).json({
                title : 'Validation failed',
                ...error
            })
            break;
        case 500:
            res.status(500).json({
                title : 'Internal error occured',
                ...error
            })
            break;
        default:
            res.status(404).json({
                title : 'Not Found',
                ...error
            })
            break;
    }
}

export default errorhandler



