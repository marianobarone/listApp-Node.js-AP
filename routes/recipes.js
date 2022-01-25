var express = require("express");
var router = express.Router();
var recipesDB = require("../data/recipesDB");

router.get("/", async function (req, res, next) {
  var recipes = await recipesDB.getRecipes();
  res.send(recipes);
});

router.get("/:idRecipe", async function (req, res, next) {
  var recipe = await recipesDB.getRecipeById(req.params.idRecipe);
  if (recipe) {
    res.send(recipe);
  } else {
    res.status(404).send("Receta no encontrada");
  }
});

module.exports = router;
