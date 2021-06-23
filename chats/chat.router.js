const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getChats,
  createChat,
  getchatsById,
  createMensaje,
  getMensajes,
  deleteMensaje,
  enviarMail
} = require("./chat.controller");

router.get("/", checkToken, getChats);
router.get("/:id", checkToken, getchatsById);

router.post("/new", checkToken, createChat);
router.post("/mensaje", checkToken, createMensaje);
router.get("/mensaje/:id", checkToken, getMensajes);
router.delete("/mensaje/", checkToken, deleteMensaje);
router.post("/mensaje/mail", checkToken, enviarMail);

module.exports = router;