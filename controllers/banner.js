const { Banner } = require('../models')

class BannerController {
    static create(req, res, next){
        const { title, image_url, status } = req.body
        Banner.create({
            title, image_url, status, UserId: req.loggedIn.id
        }).then(data => {
            if(req.loggedIn.email !== 'admin@mail.com') throw { msg: 'admin only', code: 403}
            else{
                res.status(201).json({data})
            }
        }).catch(err => next(err))
    }

    static findAll(req, res, next){
        Banner.findAll({
            order: [['id', 'asc']]
        }).then(data => {
            res.status(200).json({data})
        }).catch(err => next(err))
    }

    static findById(req, res, next){
        const id = req.params.id
        Banner.findByPk(id)
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => next(err))
    }

    static update(req, res, next){
        const id = req.params.id
        const { title, image_url, status } = req.body
        Banner.update({title, image_url, status}, {
            where: {
                id: id
            }
        }).then(data => {
            res.status(200).json({data, msg: 'succes update banner'})
        }).catch(err => next(err))
    }

    static delete(req, res, next){
        const id = req.params.id
        Banner.destroy({
            where: {
                id:id
            }
        }).then(data => {
            res.status(200).json({ msg: 'succes delete baner'})
        }).catch(err => next(err))
    }
}

module.exports = BannerController