import { Box, Typography, useTheme } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index";
import PostWidget from "./PostWidget";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const PostsWidget = ({ userId, getWhosePosts }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { friends } = useSelector((state) => state.user);
  const { palette } = useTheme();

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.json();

    if (posts.err) {
      console.log(posts.err);
    } else {
      dispatch(setPosts({ posts }));
    }
  };

  const getFriendsPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/friends/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const posts = await response.json();

    if (posts.err) {
      console.log(posts.err);
    } else {
      dispatch(setPosts({ posts }));
    }
  };

  const getAllPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/explore`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.json();

    if (posts.err) {
      console.log(posts.err);
    } else {
      dispatch(setPosts({ posts }));
    }
  };

  useEffect(() => {
    if (getWhosePosts == "user") {
      getUserPosts();
    } else if (getWhosePosts == "friends") {
      getFriendsPosts();
    } else {
      getAllPosts();
    }
  }, []);

  useEffect(() => {
    if (getWhosePosts == "friends") {
      getFriendsPosts();
    }
  }, [friends]);

  return (
    <>
      {posts.length != 0 ? (
        posts.map(
          ({
            _id,
            userId,
            username,
            description,
            postPic,
            userProfilePic,
            likes,
            comments,
            timestamp,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUsername={username}
              postUserId={userId}
              description={description}
              postPic={postPic}
              userProfilePic={userProfilePic}
              likes={likes}
              comments={comments}
              timestamp={timestamp}
            />
          )
        )
      ) : (
        <Box
          m="2rem 0"
          padding="1.5rem"
          backgroundColor={palette.background.alt}
          borderRadius="0.75rem"
        >
          <FlexBetween flexDirection="column" gap="2rem">
            <Typography variant="h3" textAlign="center">
              Your friends and you have not posted anything
            </Typography>
            <Typography variant="h3" textAlign="center">
              Head over to the explore page or post something!
            </Typography>
            <SentimentVeryDissatisfied fontSize="large" />
          </FlexBetween>
        </Box>
      )}
    </>
  );
};

export default PostsWidget;
