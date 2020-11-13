const router = require('express').Router()
const UserController = require('../controllers/user')
const ProductController = require('../controllers/product')
const BannerController = require('../controllers/banner')
const { authentication, authorization, authorizationBanner } = require('../middleware/auth')

router.post('/login', UserController.login)

router.use(authentication)

router.post('/product', ProductController.create)
router.get('/product', ProductController.findAll)
router.get('/product/:id', ProductController.findById)
router.put('/product/:id', authorization, ProductController.update)
router.delete('/product/:id', authorization, ProductController.delete)

router.post('/banner', BannerController.create)
router.get('/banner', BannerController.findAll)
router.get('/banner/:id', BannerController.findById)
router.put('/banner/:id', authorizationBanner, BannerController.update)
router.delete('/banner/:id', authorizationBanner, BannerController.delete)

module.exports = router