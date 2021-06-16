const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("./book.controller");

router.get("/", checkToken, getBooks);
router.get("/:id", checkToken, getBookById);
router.patch("/", checkToken, updateBook);
router.delete("/", checkToken, deleteBook);

router.post("/new", checkToken, createBook);

module.exports = router;