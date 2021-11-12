const express = require('express')
const router = express.Router()

const controllersCarts = require('../controllers/carritos.controllers')
const { GetAllCarts, GetOneCart, newCart, ModifyOneCart, DeleteOneProductCart, DeleteOneCartAndProducts, addProductinTheCart } = controllersCarts

router.get('/', GetAllCarts)
router.get('/:id', GetOneCart)
router.post('/', newCart)
router.post('/:id/productos/:idProd', addProductinTheCart)
router.put('/:id', ModifyOneCart)
router.delete('/:id', DeleteOneCartAndProducts)
router.delete('/:id/productos/:idProd', DeleteOneProductCart)
/* ------------------------------ */



module.exports = router;
