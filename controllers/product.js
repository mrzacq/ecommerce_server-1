const { User, Product } = require('../models')

class ProductController{
    static create(req, res, next){
        const { name, image_url, price, stock } = req.body
        // console.log(req.loggedIn, 'aaaaaaaaaaaaaaa')
        Product.create({
            name, image_url, price, stock, UserId: req.loggedIn.id
        }).then((dataProduct) => {
            if(req.loggedIn.email !== 'admin@mail.com') throw { msg: 'admin only', code: 403}
            else{
                res.status(201).json({ msg: 'success add product', product: dataProduct.name})
            }
        }).catch(err => {
            // console.log(err, 'aaaaaaaaaaaa')
            next(err)
        })
    }

    static findAll(req, res, next){
        Product.findAll({
            order: [['id', 'asc']],
            include: {
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }
        }).then(dataProduct => {
            // console.log(dataProduct, 'aadjflkdasflkdjas;flj')
            res.status(200).json({dataProduct})
        }).catch(err => {
            // console.log(err, 'aljdlsdflflj')
            next(err)
        })
    }
    static findById(req, res, next){
        let id = req.params.id
        Product.findByPk(id, {
            include: {
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }
        }).then(dataProduct => {
            res.status(200).json({dataProduct})
        }).catch(err => {
            next(err)
        })
    }

    static update(req, res, next){
        let id = req.params.id
        const { name, image_url, price, stock } = req.body
        Product.update({name, image_url,price, stock}, {where: {id: id}})
        .then(dataProduct => {
            res.status(200).json({msg: 'success update product'})
        }).catch(err => {
            next(err)
        })
    }
    static delete(req, res, next){
        let id = req.params.id
        Product.destroy({
            where: {
                id:id
            }
        }).then(dataProduct => {
            // console.log(dataProduct, 'adsfdjafkldjsa')
            res.status(200).json({msg: 'Product deleted'})
        }).catch(err => {
            // console.log(err, 'adfdasfds')
            next(err)
        })
    }
}

module.exports= ProductController