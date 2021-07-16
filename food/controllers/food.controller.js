const db = require("../models");
const foodService = require("../service/food.service");
const Food = db.food;

// Create and Save a new Food
exports.create = (req, res) => {
  console.log("create : " + req.body.foodName);
  // Validate request
  if (!req.body.foodName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  foodService.create(req.body.foodName, req.body.shop,req.body.url).then(data => {
    res.send(data);
  });
};

// Retrieve all Foods from the database.
exports.findAll = (req, res) => {
  foodService.findAll()
    .then(data => {
      res.send(data);
    });
};

// Find a single Food with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  foodService.findOne(id).then(data => {
    res.send(data);
  });
};
// Update a Food by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Food.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Food with id=${id}. Maybe Food was not found!`
        });
      } else res.send({ message: "Food was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Food with id=" + id
      });
    });
};

// Delete a Food with the specified id in the request
exports.delete = (req, res) => {
  console.log("delete : " + req.body.id);
  var val = req.body.id;
  if (val === undefined || val === "") {
    res.status(404).send({ message: `id can not be empty` });
  } else {
    foodService.delete(val).then(data => {
      if (!data) {
        res.status(500).send({
          message: "Cannot delete Food with id="+val+". Maybe Food was not found!"
        });
      } else res.send({ message: "Food was delete successfully." });
    });
  }
};

// Delete all Foods from the database.
exports.deleteAll = (req, res) => {
  Food.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Foods were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all foods."
      });
    });
};
// Find all published Foods
exports.findAllPublished = (req, res) => {
  Food.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving foods."
      });
    });
};