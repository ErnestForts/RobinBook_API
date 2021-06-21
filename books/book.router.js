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
<<<<<<< Updated upstream
  insertBookFav
=======
  insertBookFav,
  deleteBookFav,
  getComent,
  likeComent,
  puntuarLibro,
  getPuntuaciones
>>>>>>> Stashed changes
} = require("./book.controller");

router.get("/", checkToken, getBooks);
router.get("/:id", checkToken, getBookById);
router.patch("/", checkToken, updateBook);
router.delete("/", checkToken, deleteBook);

router.post("/new", checkToken,createBook);
router.post("/coment", checkToken, createComent);
router.get("/fav/:id", checkToken, getBookFav);
router.post("/newfav", checkToken, insertBookFav);
<<<<<<< Updated upstream
=======
router.delete("/deletefav", checkToken, deleteBookFav);
router.post("/puntuar", checkToken, puntuarLibro);
router.get("/puntuado", checkToken, getPuntuaciones);
>>>>>>> Stashed changes

module.exports = router;