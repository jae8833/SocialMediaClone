import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      {image != "null" ? (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="User Image"
          src={`http://localhost:3001/images/${image}`}
        />
      ) : (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="User Image"
          src={`http://localhost:3001/images/blankProfile.webp`}
        />
      )}
    </Box>
  );
};

export default UserImage;
