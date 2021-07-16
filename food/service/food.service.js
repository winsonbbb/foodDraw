const db = require("../models");
const Food = db.food;

// Create and Save a new Food
exports.create = async (foodName, shop,url) => {

    // Create a Food
    const food = new Food({
      foodName: foodName,
      shop: shop,
      url: url
    });
  
    // Save Food in the database
   return  await food
      .save(food)
      .then(data => {
          return food;
      })
      .catch(err => {
      });

};

// Retrieve all Foods from the database.
exports.findAll = async () => {
    return await Food.find()
      .then(data => {
        return data;
      })
      .catch(err => {
      });
  };

// Find a single Food with an id
exports.findOne = async (id) => {

    return await Food.findById(id)
    .then(data => {
      if (!data)
       return "";
      else 
       return data;
    })
    .catch(err => {
        return "";
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
exports.delete = async (id) => {
      return await Food.findByIdAndDelete(id)
      .then(data => {
        console.log(data)
        if (!data) {
            console.log('Cannot delete Food with id=${id}. Maybe Food was not found!');
        } else {
            console.log("Food was deleted successfully!")
        }
        return data;
      })
      .catch(err => {
          console.log("Could not delete Food with id=" + id);
      });
  };