// import mongoose
import mongoose from "mongoose";
// Create Schema
const Variant = mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
});

// export model
export default mongoose.model("variants", Variant);
