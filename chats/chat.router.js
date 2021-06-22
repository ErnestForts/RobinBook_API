const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getChats,
  createChat,
  getchatsById,
  updateBook,
  deleteBook,
  createComent,
  getBookFav,
  insertBookFav,
  deleteBookFav,
  getComent,
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
// router.post("/coment", checkToken, createComent);
// router.get("/coment/:id", checkToken, getComent);
// router.post("/like", checkToken, likeComent);
// router.get("/fav/:id", checkToken, getBookFav);
// router.post("/newfav", checkToken, insertBookFav);
// router.delete("/deletefav", checkToken, deleteBookFav);
// router.post("/puntuar", checkToken, puntuarLibro);
// router.post("/mail", checkToken, enviarMail);
// router.get("/valorar", checkToken, getValorarLibro);

module.exports = router;