var db = require("./db");
const admin = require("../data/admin");

async function getUserById(idUser) {
  const snap = await db.collection("users").where("UID", "==", idUser).get();

  var user;

  if (snap) {
    snap.forEach((doc) => {user = { id: doc.id, ...doc.data() };});
    console.log(user.grupoSeleccionado);
    
    user.grupoSeleccionado = await buscarGrupoSeleccionado(user)   
  }
  console.log("Datos Usuario: ",user);
  return user
}

async function buscarGrupoSeleccionado(user) {
    const grupoSeleccionado = await user.grupoSeleccionado.get();    
    console.log(grupoSeleccionado.data());
    return grupoSeleccionado.data();
}

async function createUser(nuevoGrupo, nuevoUsuario) {
  let result = await db.collection("groups").doc().set(nuevoGrupo);

  const snap = await db.collection("groups").where("duenio", "==", nuevoUsuario.mail).get();
  //console.log("SNAP", snap)
  let group;

  if (snap) {
    snap.forEach((doc) => {
      group = { id: doc.id, ...doc.data() };
    });

    //console.log("GRUPO NUEVO", group)
  }

  nuevoUsuario = { grupoSeleccionado: db.doc("groups/" + group.id), ...nuevoUsuario, };

  result = await db.collection("users").doc().set(nuevoUsuario);

  return result;
}

module.exports = { getUserById, createUser };
