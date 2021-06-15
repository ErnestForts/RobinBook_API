const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getBook,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("./book.controller");

router.get("/", checkToken, getBook);
router.get("/:id", checkToken, getBookById);
router.patch("/", checkToken, updateBook);
router.delete("/", checkToken, deleteBook);

router.post("/new", createBook);

module.exports = router;