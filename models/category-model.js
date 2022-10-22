const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const categoryModel = new mongoose.Schema(
  {
    parent: Number,
    text: String,
    parentPath: Array,
  },
  { timestamps: true }
);

categoryModel.plugin(AutoIncrement, {
  id: "order_seq",
  inc_field: "id",
});
module.exports = mongoose.model("category", categoryModel);
