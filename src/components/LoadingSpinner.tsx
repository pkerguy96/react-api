import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box className="flex justify-center items-center ">
      <CircularProgress size={"4rem"} />
    </Box>
  );
};

export default LoadingSpinner;
