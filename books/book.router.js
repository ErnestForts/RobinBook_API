const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createComent,
  getBookFav,
  insertBookFav,
  getComent,
  getBookScore
} = require("./book.controller");

router.get("/", checkToken, getBooks);
router.get("/:id", checkToken, getBookById);
router.patch("/", checkToken, updateBook);
router.delete("/", checkToken, deleteBook);

router.post("/new", checkToken,createBook);
router.post("/coment", checkToken, createComent);
router.get("/coment/:id", checkToken, getComent);
router.get("/fav/:id", checkToken, getBookFav);
router.get("/score/:id", checkToken, getBookScore);
router.post("/newfav", checkToken, insertBookFav);

module.exports = router;