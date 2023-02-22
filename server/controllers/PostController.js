const Post = require("../models/Post");
const User = require("../models/User");

exports.post_post = async function (req, res, next) {
  try {
    const { userId, description, postPic } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      username: user.username,
      userProfilePic: user.profilePic,
      postPic,
      description,
      timestamp: Date.now(),
      likes: {},
      comments: [],
    });
    await newPost.save();

    return res.status(201).json({ msg: "Posted successfully" });
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

exports.friendsPosts_get = async function (req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const friends = user.friends;
    let friendsPosts = [];

    for (friend of friends) {
      const posts = await Post.find({ userId: friend });
      friendsPosts = friendsPosts.concat(posts);
    }
    const userPosts = await Post.find({ userId: userId });
    friendsPosts = friendsPosts.concat(userPosts);

    friendsPosts.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });

    return res.status(200).json(friendsPosts);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

exports.allPosts_get = async function (req, res, next) {
  try {
    const allPosts = await Post.find();

    allPosts.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });

    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

exports.userPosts_get = async function (req, res, next) {
  try {
    const userId = req.params.id;

    let userPosts = await Post.find({ userId: userId });

    userPosts.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });

    return res.status(200).json(userPosts);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

exports.likePost_put = async function (req, res, next) {
  try {
    const postId = req.params.id;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        likes: post.likes,
      },
      { new: true }
    );
    await updatedPost.save();

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

exports.commentPost_put = async function (req, res, next) {
  try {
    const postId = req.params.id;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (post.userId.toString() == userId) {
      post.comments.push(`${req.body.comment} - ${user.username} (You)`);
    } else {
      post.comments.push(`${req.body.comment} - ${user.username}`);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        comments: post.comments,
      },
      { new: true }
    );
    await updatedPost.save();

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};
