const { Cart, Product } = require('../models')

class CartController{
    static findAll(req, res, next){
        Cart.findAll({
            order: [['id', 'asc']],
            include: [Product]
        }).then(data => {
            console.log(data)
            res.status(200).json({data})
        }).catch(err => {
            console.log(err)
            next(err)
        })
    }
    static create(req, res, next){
        const { ProductId, quantity } = req.body
        // console.log(req.loggedIn, 'ini req logged in')
        Cart.findOne({
            where: {
                ProductId: ProductId,
                UserId: req.loggedIn.id
            }
        }).then(data => {
            console.log(data, 'ini findone')
            if(!data){
                return Cart.create({
                    ProductId, UserId: req.loggedIn.id, quantity: 1, status: true // true berarti masih ada barangnya kalo false sebaliknya
                })
            } else {
                return Cart.increment({
                    quantity
                },{
                    where: {
                        ProductId: ProductId,
                        UserId: req.loggedIn.id
                    }
                })
            }
        }).then(cart => {
            console.log(cart, 'ini data cart')
            res.status(201).json({ cart, msg: 'succes add to cart' })
        }).catch(err => {
            console.log(err, 'ini data cart')
            next(err)
        })
    }

    static updateQuantity(req, res, next){
        const { quantity } = req.body
        Cart.update({
            quantity: +quantity
        }, {
            where: {
                id: +req.params.id,
                UserId: req.loggedIn.id
            }
        }).then(data => {
            console.log(data, 'ini quantit')
            res.status(200).json({ data, msg: 'succes update quantity'})
        }).catch(err => {
            console.log(err, 'iinerr')
            next(err)
        })
    }

    static deleteCart(req, res, next){
        const id = req.params.id
        Cart.destroy({
            where: {
                id: id,
                UserId: req.loggedIn.id
            }
        }).then(data => {
            // console.log(data)
            res.status(200).json({msg: 'success delete cart'})
        }).catch(err => {
            next(err)
        })
    }
}

module.exports = CartController