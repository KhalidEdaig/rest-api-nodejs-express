// import models
import Joi from "joi";
import Product from "../models/Product.js";
import Variant from "../models/Variant.js";
// function get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("variants");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function get single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("variants");
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function Create Product
export const saveProduct = async (req, res) => {
  const result = validateProductData(req.body);
  if (result.error) {
    res.send(result.error.details);
  }

  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// function Update Product
export const updateProduct = async (req, res) => {
  const cekId = await Product.findById(req.params.id);
  if (!cekId) return res.status(404).json({ message: "Product not found" });
  const result = validateProductData(req.body);
  if (result.error) {
    res.send(result.error.details);
  }
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// function Delete Product
export const deleteProduct = async (req, res) => {
  const cekId = await Product.findById(req.params.id);
  if (!cekId) return res.status(404).json({ message: "Product not found" });
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// function Create Variant
export const getAllVariants = async (req, res) => {
  const cekId = await Product.findById(req.params.id);
  if (!cekId) return res.status(404).json({ message: "Product not found" });
  try {
    const variants = await Variant.find({ product: req.params.id }).populate(
      "products"
    );
    res.json(variants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function Create Variant
export const saveVariant = async (req, res) => {
  const cekId = await Product.findById(req.params.id);
  if (!cekId) return res.status(404).json({ message: "Product not found" });
  const result = validateVariantData(req.body);
  if (result.error) {
    res.send(result.error.details);
  }
  let variant = new Variant(req.body);
  variant.product = req.params.id;
  try {
    const savedVariant = await variant.save();
    res.status(201).json(savedVariant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

function validateProductData(product) {
  const schema = Joi.object({
    reference: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    image: Joi.string().min(3).required(),
  });

  return schema.validate(product);
}

function validateVariantData(variant) {
  const schema = Joi.object({
    sku: Joi.string().min(6).required(),
    specification: Joi.string().min(3).required(),
    price: Joi.number().required(),
  });

  return schema.validate(variant);
}
