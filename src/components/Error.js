import { Typography, Box } from "@mui/material";
import React from "react";

const Error = () => {
  return (
    <Box display="flex" marginX="auto" height="100vh">
      <Typography color="white" component="h1">
        Erorr: 404 <br></br>
        No Page Found
      </Typography>
    </Box>
  );
};

export default Error;
