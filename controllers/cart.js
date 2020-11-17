const { Cart, Product } = require('../models')

class CartController{
    static findAll(req, res, next){
        Cart.findAll({
            order: [['id', 'asc']],
            include: [Product],
            where: {
                UserId: req.loggedIn.id
            }
        }).then(data => {
            console.log(data)
            res.status(200).json({data})
        }).catch(err => {
            console.log(err)
            next(err)
        })
    }
    static create(req, res, next){
        const quantity = 1
        const { id } = req.params// ini idi product dari tombol
        Cart.findOne({
            where: {
                ProductId: id,
                UserId: req.loggedIn.id
            },
            include: [Product]
        }).then(data => {
            // console.log(data.quantity, 'ini qutty')
            if(!data){
                return Cart.create({
                    ProductId: id, UserId: req.loggedIn.id, quantity: 1, status: true // true berarti masih ada barangnya kalo false sebaliknya
                })
            } else {
                if(data.quantity >= data.Product.dataValues.stock) throw { msg: 'stock reach maximum'}
                else{
                    // console.log(data.Product.dataValues.stock)
                    return Cart.increment({
                        quantity
                    },{
                        where: {
                            ProductId: id,
                            UserId: req.loggedIn.id
                        }
                    })
                }
            }
        }).then(cart => {
            // console.log(cart, 'ini data cart')
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