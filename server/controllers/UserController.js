const User = require("../models/User");

exports.user_get = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

exports.userFriends_get = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, username, email, bio, profilePic }) => {
        return { _id, username, email, bio, profilePic };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

exports.addRemoveFriend_put = async function (req, res, next) {
  try {
    const { id, friendId } = req.params;
    const userId = id;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id != friendId);
      friend.friends = friend.friends.filter((id) => id != userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, username, email, bio, profilePic }) => {
        return { _id, username, email, bio, profilePic };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};
