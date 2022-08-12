// import mongoose

import mongoose from "mongoose";
// Create Schema
const Product = mongoose.Schema({
  reference: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// export model
export default mongoose.model("products", Product);
