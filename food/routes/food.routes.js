module.exports = app => {
  const food = require("../controllers/food.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", food.create);

  // Retrieve all Tutorials
  router.get("/", food.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", food.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", food.findOne);

  // Update a Tutorial with id
  // router.put("/:id", food.update);

  // Delete a Tutorial with id
  router.post("/delete", food.delete);

  // Create a new Tutorial
  // router.delete("/", food.deleteAll);

  app.use('/api/food', router);
};