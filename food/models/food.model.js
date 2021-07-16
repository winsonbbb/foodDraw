module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      foodName: String,
      shop: String,
      url: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Food = mongoose.model("food", schema);
  return Food;
};