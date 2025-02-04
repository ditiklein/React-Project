import { Box, Typography } from "@mui/material";
import myfood from "../images/myfood.jpg";
import myfood2 from "../images/myfood2.jpg";
import myfood3 from "../images/myfood3.jpg";
import myfood4 from "../images/myfood4.jpg";
import myfood5 from "../images/myfood.jpg";

const images = [myfood, myfood2, myfood3, myfood4, myfood5];

export default () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4} 
      minHeight="70vh" 
      sx={{ paddingTop: 10 }} 
    >
     
      <Typography
        variant="h2"
        sx={{
          background: "linear-gradient(to right, #FF5733, #FF8D1A, #FFC300, #DAF7A6, #33FF57)",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
          animation: "colorChange 4s infinite",
          marginBottom: 3,
          fontSize: "5rem", 
        }}
      >
        The Recipes House!!!
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
        sx={{ overflow: "hidden" }}
      >
        {images.map((img, index) => (
          <Box key={index} display="flex" flexDirection="column" alignItems="center">
            <Box
              component="img"
              src={img}
              alt={`תמונה ${index + 1}`}
              sx={{ maxWidth: 200, width: "100%", borderRadius: 2, boxShadow: 3 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
