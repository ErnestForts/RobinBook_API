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
  deleteBookFav,
  getComent,
  puntuarLibro
} = require("./book.controller");

router.get("/", checkToken, getBooks);
router.get("/:id", checkToken, getBookById);
router.patch("/", checkToken, updateBook);
router.delete("/", checkToken, deleteBook);

router.post("/new", checkToken, createBook);
router.post("/coment", checkToken, createComent);
router.get("/coment/:id", checkToken, getComent);
router.get("/fav/:id", checkToken, getBookFav);
router.post("/newfav", checkToken, insertBookFav);
router.delete("/deletefav", checkToken, deleteBookFav);
router.post("/puntuar", checkToken, puntuarLibro);

module.exports = router;