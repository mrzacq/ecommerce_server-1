const { Cart, Product } = require('../models')

class CartController{
    static findAll(req, res, next){
        Cart.findAll({
            order: [['id', 'asc']],
            include: [Product],
            where: {
                UserId: req.loggedIn.id,
                status: true 
            }
        }).then(data => {
            res.status(200).json({data})
        }).catch(err => {
            next(err)
        })
    }
    static create(req, res, next){
        const quantity = 1
        const { id } = req.params// ini idi product dari tombol
        Cart.findOne({
            where: {
                ProductId: id,
                UserId: req.loggedIn.id,
                status: true
            },
            include: [Product]
        }).then(data => {
            if(!data){
                return Cart.create({
                    ProductId: id, UserId: req.loggedIn.id, quantity: 1, status: true // true berarti masih ada barangnya kalo false sebaliknya
                })
            } else {
                if(data.quantity >= data.Product.dataValues.stock) throw { msg: 'Quantity reach maximum'}
                else{
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
            res.status(201).json({ cart, msg: 'succes add to cart' })
        }).catch(err => {
            next(err)
        })
    }

    static updateQuantity(req, res, next){
        const { quantity } = req.body
        let qtt = quantity - 1
        Cart.update({
            quantity: qtt
        }, {
            where: {
                id: +req.params.id,
                UserId: req.loggedIn.id
            }
        }).then(data => {
            res.status(200).json({ data, msg: 'succes update quantity'})
        }).catch(err => {
            next(err)
        })
    }

    static checkout(req, res, next){
        const { status, ProductId, quantity } = req.body
        if(quantity <= 0) throw { msg: 'Please input quantity!'}
        Cart.findOne({
            where: {
                id: req.params.id,
                UserId: req.loggedIn.id,
                ProductId: ProductId,
                status
            },
            include: [Product]
        }).then(data => {
            let stock = data.Product.stock
            if(data) {
                return Product.update({
                    stock: stock - quantity,
                }, {
                    where: {
                        id: ProductId
                    }
                })
            }
            else throw { msg: 'cart not found'}
        }).then(data => {
            if(!data) throw {msg: 'failed to checkout'}
            else{
                return Cart.update({
                    status: false
                }, {
                    where: {
                        UserId: req.loggedIn.id,
                        ProductId
                    }
                })
            }
        }).then(data => {
        res.status(200).json({ data, msg: 'sukses checkout'})
        }).catch(err => {
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
            res.status(200).json({msg: 'success delete cart'})
        }).catch(err => {
            next(err)
        })
    }
}

module.exports = CartController