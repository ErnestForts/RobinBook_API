const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  createComent
} = require("./place.controller");

router.get("/", checkToken, getPlaces);
router.get("/:id", checkToken, getPlaceById);
router.patch("/", checkToken, updatePlace);
router.delete("/", checkToken, deletePlace);

router.post("/new", checkToken, createPlace);
router.post("/coment", checkToken, createComent);

module.exports = router;