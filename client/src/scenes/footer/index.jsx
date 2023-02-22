import { Box, useTheme } from "@mui/material";
import { Explore, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Footer = () => {
  const navigate = useNavigate();

  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const alt = palette.background.alt;

  return (
    <FlexBetween backgroundColor={alt}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => {
          navigate("/home");
        }}
        sx={{
          width: "50%",
          height: "100%",
          "&:hover": { cursor: "pointer", backgroundColor: neutralLight },
        }}
      >
        <Box padding="1rem 0">
          <Home sx={{ fontSize: "1.75rem" }} />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => {
          navigate("/explore");
        }}
        sx={{
          width: "50%",
          height: "100%",
          "&:hover": { cursor: "pointer", backgroundColor: neutralLight },
        }}
      >
        <Box padding="1rem 0">
          <Explore sx={{ fontSize: "1.75rem" }} />
        </Box>
      </Box>
    </FlexBetween>
  );
};

export default Footer;
