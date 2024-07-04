const mongoose = require("mongoose");
const { v4 } = require("uuid");

const productschema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    product_name: {
      type: String,
      require: true,
    },
    product_prize: {
      type: Number,
      require: true,
    },
    product_brand: {
      type: String,
      require: true,
    },
    active : {
        type : Boolean,
        default : true,
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("product item", productschema);

module.exports = {
  Product,
};
