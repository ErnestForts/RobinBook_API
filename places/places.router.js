const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  createBook,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");

router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

router.post("/login", login);
router.post("/register", createUser);

module.exports = router;