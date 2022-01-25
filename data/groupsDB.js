var db = require('./db');

async function getGroups() {
    const collection = await db.collection('groups').get();
    const groups = [];
    collection.forEach(doc => {
        //console.log("ACA LA DATA: ", doc.data())
        groups.push({id:doc.id, ...doc.data()});
    });
    return groups;
}

async function getGroupById(idGroup) {
    const snap = await db.collection('groups').doc(idGroup).get();
    var group;
    if(snap.exists) group = {id : snap.id, ...snap.data()};
    return group;
}

async function addGroup(group) {
    const result = await db.collection('groups').doc().set(group);
    return result;
}

async function updateGroup(groupId, group) {
    const result = await db.collection('groups').doc(groupId).update(group);
    return result;
}

async function deleteGroup(idGroup) {
    const result = await db.collection('groups').doc(idGroup).delete();
    return result;
}



module.exports = {getGroups, getGroupById, addGroup, updateGroup, deleteGroup};