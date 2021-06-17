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
  insertPlaceFav,
  getComent
} = require("./place.controller");

router.get("/", checkToken, getPlaces);
router.get("/:id", checkToken, getPlaceById);
router.patch("/", checkToken, updatePlace);
router.delete("/", checkToken, deletePlace);

router.post("/new", checkToken, createPlace);
router.post("/coment", checkToken, createComent);
router.get("/coment/:id", checkToken, getComent);
router.get("/fav/:id", checkToken, getPlaceFav);
router.post("/newfav", checkToken, insertPlaceFav);

module.exports = router;