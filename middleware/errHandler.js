let errors = []
let code = 500

function errHandler(err, req, res, next){
    switch(err.name){
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
                errors.push(el.message)
            })
            code = 400
            break;
        default:
            errors.push(err.msg || 'internal server error')
            code = err.code || 500
            break;
    }
    res.status(code).json({errors})
}

module.exports = errHandler