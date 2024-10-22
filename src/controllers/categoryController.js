const express = require("express");
const CategoryModel = require("../db/model/categoryModel");

const addCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    const findName = await CategoryModel.findOne({
      name,
    });

    if (findName) {
      return res
        .status(400)
        .send({ status: false, message: "Category already exists" });
    }

    if (!["income", "expense"].includes(type)) {
      return res
        .status(400)
        .json({ error: "Invalid category type. Must be income or expense." });
    }

    const newCategory = new CategoryModel({ name, type });
    const categoryDetails = await newCategory.save();

    res.status(201).send({
      status: true,
      message: "Category created successfully",
      data: categoryDetails,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const name = req.params.name;
    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "Category name is required" });
    }
    const category = await CategoryModel.findOne({
      name,
    });
    if (!category) {
      return res
        .status(404)
        .send({ status: false, message: "Category not found" });
    }
    res.status(200).send({
      status: true,
      message: "Category found successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).send({
      status: true,
      message: "Categories found successfully",
      data: categories,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { addCategory, getCategory, getAllCategories };
