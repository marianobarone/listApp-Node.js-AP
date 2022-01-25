var express = require('express');
const db = require('../data/db');
var router = express.Router();
var productosDB = require('../data/productsDB')


router.get('/',async function(req, res, next) {    
    var prod = await productosDB.getProducts()
    res.send(prod)
});

// router.get('/carga', async function(req, res, next) { 

//    const data = []

//    console.log(data)
//    data.forEach(async prod =>  {
//       await db.collection("recipes").doc().set(prod)
//    })
//    res.send("ok")  
// });

router.get('/barcode/:barcode', async function(req, res, next) {    
   console.log(req.params.barcode)
    var prod = await productosDB.getProductByBarcode(req.params.barcode)
    if(prod) res.send(prod)
    else res.status(404).send('Producto no encontrado');
});

router.get('/:idProducto', async function(req, res, next) {    
   var prod = await productosDB.getProductById(req.params.idProducto)
   if(prod) res.send(prod)
   else res.status(404).send('Producto no encontrado');
});

module.exports = router;