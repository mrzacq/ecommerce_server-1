const router = require('express').Router()
const CartController = require('..//controllers/cart')
const { authorizationCart } = require('../middleware/auth')

router.get('/', CartController.findAll)
router.post('/', CartController.create)
router.patch('/:id', authorizationCart, CartController.updateQuantity)
router.delete('/:id', authorizationCart, CartController.deleteCart)

module.exports = router