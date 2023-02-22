import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../navbar/index";
import Footer from "../footer/index";
import PostsWidget from "../widgets/PostsWidget";

const ExplorePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px");
  const { _id, profilePic } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      justifyContent="space-between"
    >
      <Box>
        <Navbar />
        {isNonMobileScreens ? (
          <Box
            width="100%"
            padding="2rem 25%"
            display="flex"
            flexDirection="column"
          >
            <PostsWidget userId={_id} />
          </Box>
        ) : (
          <Box
            width="100%"
            padding="2rem 6%"
            display="flex"
            flexDirection="column"
          >
            <PostsWidget userId={_id} />
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default ExplorePage;
