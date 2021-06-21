const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  createComent,
  getPlaceFav,
<<<<<<< Updated upstream
  insertPlaceFav
=======
  insertPlaceFav,
  deletePlaceFav,
  getComent,
  likeComent,
  puntuarLugar,
  getPuntuaciones
>>>>>>> Stashed changes
} = require("./place.controller");

router.get("/", checkToken, getPlaces);
router.get("/:id", checkToken, getPlaceById);
router.patch("/", checkToken, updatePlace);
router.delete("/", checkToken, deletePlace);

router.post("/new", checkToken, createPlace);
router.post("/coment", checkToken, createComent);
router.get("/fav/:id", checkToken, getPlaceFav);
router.post("/newfav", checkToken, insertPlaceFav);
<<<<<<< Updated upstream
=======
router.delete("/deletefav", checkToken, deletePlaceFav);
router.post("/puntuar", checkToken, puntuarLugar);
router.get("/puntuado", checkToken, getPuntuaciones);
>>>>>>> Stashed changes

module.exports = router;