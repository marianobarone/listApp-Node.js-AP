var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth.js');
const dataGroups = require('../data/groupsDB');

// --------------------GET---------------------------------

router.get('/', async function(req, res, next) {
    const groups = await dataGroups.getGroups();
    //res.send(JSON.stringify(groups, null, ' '));
    res.send(groups);
});

router.get('/:idGroup', async function(req, res, next) {    
    const group = await dataGroups.getGroupById(req.params.idGroup);
    if(group) res.send(group)
    else res.status(404).send('Grupo no encontrado');
 });

 
// --------------------POST---------------------------------

router.post("/", async (req, res) => {
    const group = req.body;
    const result = await dataGroups.addGroup(group);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
      } else {
        res.json(group);
      }  
});


// --------------------PUT---------------------------------

router.put('/:idGroup', async function(req, res, next) {    
    const group = req.body;
    console.log(group)
    const result = await dataGroups.updateGroup(req.params.idGroup, group);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
      } else {
        res.json(group);
      }  
});

// --------------------DELETE-------------------------------

router.delete('/:idGroup', async function(req, res, next) {    
    //const group = req.body;
    console.log("GRUPO ID: ", req.params.idGroup);
    const result = await dataGroups.deleteGroup(req.params.idGroup);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
      } else {
        res.json(result);
      }  
});


module.exports = router;
