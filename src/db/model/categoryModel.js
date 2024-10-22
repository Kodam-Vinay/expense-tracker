const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
});
const CategoryModel = model("Category", categorySchema);
module.exports = CategoryModel;
