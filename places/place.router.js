const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace
} = require("./place.controller");

router.get("/", checkToken, getPlaces);
router.get("/:id", checkToken, getPlaceById);
router.patch("/", checkToken, updatePlace);
router.delete("/", checkToken, deletePlace);

router.post("/new", createPlace);

module.exports = router;