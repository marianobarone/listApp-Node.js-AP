const admin = require('../data/admin');

async function auth(req, res, next) {
    try {     
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedValue = await admin.auth().verifyIdToken(token);         
        if (decodedValue) {
            req.user = decodedValue;
            next();
        } else {
            res.status(401).send("Usuario no encontrado");
            //res.status(401).send({error: error.message});
        } 
    } catch (error) {
        res.status(401).send("Usuario no autorizado");
        //res.status(401).send({error: error.message});        
    }
}

module.exports = auth;