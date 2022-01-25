var express = require("express");
var router = express.Router();
var db = require('../data/db');
//
const auth = require("../middleware/auth.js");
const dataUsers = require('../data/users');

/* GET users listing. */
router.get("/", auth, async function (req, res, next) {
  console.log("USUARIO: ", req.user);
  res.send("Hola: " + req.user.name);
});

router.get("/:idUsuario", async function (req, res) {
  const usuario = await dataUsers.getUserById(req.params.idUsuario);

  if (usuario) {    
    res.send(usuario);
  } 
   else {
    res.status(404).send("Usuario no encontrado");    
  } 
});

// --------------------POST---------------------------------

router.post("/", async (req, res) => {
  const nuevoGrupo = req.body.nuevoGrupo;
  const nuevoUsuario = req.body.nuevoUsuario;

  const result = await dataUsers.createUser(nuevoGrupo, nuevoUsuario);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } 
  else {
    const snap = await db
      .collection("users")
      .where("mail", "==", nuevoUsuario.mail)
      .get();
    
    let usuario;

    snap.forEach((doc) => {
      usuario = {id: doc.id, ...doc.data()}      
    });

    res.json(usuario);
  }
});

module.exports = router;
