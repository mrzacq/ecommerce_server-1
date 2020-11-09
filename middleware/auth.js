const { verifyToken } = require('../helper/jwt')
const { User, Product } = require('../models')

async function authentication(req, res, next){
    let { token } = req.headers
    try{
        if(!token) throw {msg: "Authentication failed", code: 400}
        else{
            let decoded = verifyToken(token)
            let dataUser = await User.findOne({
                where: { email: decoded.email }
            })
            if(!dataUser) throw {msg: "Auhtentication failed", code: 400}
            else{
                req.loggedIn = decoded
                next()
            }
        }
    } catch(err){
        next(err)
    }
}

async function authorization(req, res, next){
    try {
        let product = await Product.findByPk(req.params.id)
        if(!product) throw {msg: "Product not found", code: 404}
        console.log(req.loggedIn)
        if(req.loggedIn.email === 'admin@mail.com'){
            next()
        } 
        else throw {msg: "admin only", code: 403}
    } catch (err) {
        // console.log(err,'akdjfldas;l')
        next(err)
    }
}
module.exports = { authentication, authorization }