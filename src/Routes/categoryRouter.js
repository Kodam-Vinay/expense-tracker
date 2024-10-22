const {
  addCategory,
  getCategory,
  getAllCategories,
} = require("../controllers/categoryController");

const router = require("express").Router();

router.post("/category", addCategory);
router.get("/category", getAllCategories);
router.get("/category/:name", getCategory);

module.exports = router;
