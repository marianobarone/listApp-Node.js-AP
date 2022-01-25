var db = require("./db");

async function getRecipes() {
  const recipes = await db.collection("recipes").get();
  const recipesArray = [];
  console.log(recipes.data);
  recipes.forEach((doc) => {
    recipesArray.push({ id: doc.id, ...doc.data() });
  });
  return recipesArray;
}

async function getRecipeById(idRecipe) {
  const snap = await db.collection("recipes").doc(idRecipe).get();
  var recipe = null;
  if (snap.exists) recipe = { id: snap.id, ...snap.data() };
  return recipe;
}

module.exports = { getRecipes, getRecipeById };
