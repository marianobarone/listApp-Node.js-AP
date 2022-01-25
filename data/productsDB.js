const db = require("./db");

async function getProducts() {
    const coleccion = await db.collection('products').get();
    const products = [];
    coleccion.forEach(doc => {
        products.push({id: doc.id , ...doc.data()});
    });
    return products;
}    

async function getProductById(idProduct) {
    const snap = await db.collection('products').doc(idProduct).get()
    var product = null
    if(snap.exists) product = {id : snap.id, ...snap.data()}
    return product
}

async function getProductByBarcode(barcode) {
    var product = (await db.collection('products').where('barcode','==',barcode));
    product = await (await product.get()).docs[0];
    if(product){
        product = {id: product.id, ...product.data()}
    } 
    
    return product
}

async function addProduct(product) {
    const result = await db.collection('products').add(product)
    return result
}

async function updateProducts(product) {
    const result = await db.collection('products').doc(product.id).update(product)
    return result
}

async function deleteProducts(idProduct) {
    const result = await db.collection('products').doc(idProduct).delete()
    return result
}

module.exports = {
    getProducts,
    getProductById,
    getProductByBarcode,
    addProduct,
    updateProducts,
    deleteProducts,
};