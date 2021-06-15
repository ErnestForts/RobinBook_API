const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  createPlace,
  getPlaceById,
  getPlaces,
  updatePlace,
  deletePlace
} = require("./place.controller");

router.get("/", checkToken, getPlaces);
router.get("/:id", checkToken, getPlaceById);
router.put("/", checkToken, updatePlace);
router.delete("/", checkToken, deletePlace);

router.post("/new", createPlace);

module.exports = router;