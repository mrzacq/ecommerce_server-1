const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const bcrypt = require('bcryptjs')

class UserController{
    static login(req, res, next){
        const { email, password } = req.body
        if(email !== 'admin@mail.com') throw { msg: 'admin only', code: 403}
        User.findOne({
            where: {
                email: email
            }
        }).then((dataUser) => {
            // console.log(dataUser.dataValues.role, 'adksjfdasjlkdsj')
            if(!dataUser) throw { msg: 'invalid email or password', code: 400}
            let samePwd = bcrypt.compareSync(password, dataUser.password)
            if(!samePwd) throw { msg: 'invalid email or password', code: 400}
            else{
                let payload = { id: dataUser.id, email: dataUser.email}
                let token = generateToken(payload)
                res.status(200).json({ email: payload.email, token, code: 200, msg: 'login succesfully'})
            }
        }).catch((err) => {
            // console.log(err)
            next(err)
        })
    }
}

module.exports = UserController