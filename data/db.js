//const fs = require('firebase-admin');
//const serviceAccount = require('../credential-firebase.json');

//fs.initializeApp({
// credential: fs.credential.cert(serviceAccount)
//});
const admin = require("./admin");
const db = admin.firestore(); 

module.exports = db;