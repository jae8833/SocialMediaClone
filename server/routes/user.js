const express = require("express");
const router = express.Router();
const verifyJwtToken = require("../middleware/verifyJwtToken");
const UserController = require("../controllers/UserController.js");

router.get("/:id", verifyJwtToken, UserController.user_get);

router.get("/:id/friends", verifyJwtToken, UserController.userFriends_get);

router.put(
  "/:id/:friendId",
  verifyJwtToken,
  UserController.addRemoveFriend_put
);

module.exports = router;
