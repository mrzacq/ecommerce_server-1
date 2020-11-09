const router = require('express').Router()
const UserController = require('../controllers/user')
const ProductController = require('../controllers/product')
const { authentication, authorization } = require('../middleware/auth')

router.post('/login', UserController.login)
router.use(authentication)
router.post('/product', ProductController.create)
router.get('/product', ProductController.findAll)
router.get('/product/:id', ProductController.findById)
router.put('/product/:id', authorization, ProductController.update)
router.delete('/product/:id', authorization, ProductController.delete)
module.exports = router