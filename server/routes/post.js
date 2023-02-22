const express = require("express");
const router = express.Router();
const verifyJwtToken = require("../middleware/verifyJwtToken");
const PostController = require("../controllers/PostController");

router.get("/friends/:id", verifyJwtToken, PostController.friendsPosts_get);

router.get("/explore", verifyJwtToken, PostController.allPosts_get);

router.get("/:id", verifyJwtToken, PostController.userPosts_get);

router.put("/:id/like", verifyJwtToken, PostController.likePost_put);

router.put("/:id/comment", verifyJwtToken, PostController.commentPost_put);

module.exports = router;
