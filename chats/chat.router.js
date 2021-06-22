const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getChats,
  createChat,
  getchatsById,
  createMensaje,
  getMensaje,
  updateBook,
  deleteBook,
  getBookFav,
  insertBookFav,
  deleteBookFav,
  likeComent,
  puntuarLibro,
  enviarMail,
  getValorarLibro
} = require("./chat.controller");

router.get("/", checkToken, getChats);
router.get("/:id", checkToken, getchatsById);
// router.patch("/", checkToken, updateBook);
// router.delete("/", checkToken, deleteBook);

router.post("/new", checkToken, createChat);
router.post("/mensaje", checkToken, createMensaje);
router.get("/mensaje/:id", checkToken, getMensaje);
// router.post("/like", checkToken, likeComent);
// router.get("/fav/:id", checkToken, getBookFav);
// router.post("/newfav", checkToken, insertBookFav);
// router.delete("/deletefav", checkToken, deleteBookFav);
// router.post("/puntuar", checkToken, puntuarLibro);
// router.post("/mail", checkToken, enviarMail);
// router.get("/valorar", checkToken, getValorarLibro);

module.exports = router;