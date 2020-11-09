const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const bcrypt = require('bcryptjs')

class UserController{
    static login(req, res, next){
        const { email, password, role } = req.body
        User.findOne({
            where: {
                email: email
            }
        }).then((dataUser) => {
            if(role !== 'admin') throw { msg: 'admin only', code: 403}
            if(!dataUser) throw { msg: 'invalid email or password', code: 400}
            let samePwd = bcrypt.compareSync(password, dataUser.password)
            if(!samePwd) throw { msg: 'invalid email or password', code: 400}
            else{
                let payload = { id: dataUser.id, email: dataUser.email}
                let token = generateToken(payload)
                res.status(200).json({ email: payload.email, token,role, code: 200, msg: 'login succesfully'})
            }
        }).catch((err) => {
            // console.log(err)
            next(err)
        })
    }
}

module.exports = UserController