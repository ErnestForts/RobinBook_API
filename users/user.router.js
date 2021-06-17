const router = require("express").Router();
const { checkToken } = require("../_middleware/token.validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  forgotPassword,
  newPassword
} = require("./user.controller");

router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/:id", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

router.post("/login", login);
router.post("/register", createUser);

router.put("/forgot-password", forgotPassword);
router.put("/new-password", newPassword);

module.exports = router;