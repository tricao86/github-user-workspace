import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const LoadingIndicator = ({ message = '' }: { message?: string }) => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
    <CircularProgress />
    {message && (
      <Typography variant="body2" sx={{ mt: 1 }} align="center">
        {message}
      </Typography>
    )}
  </Box>
);
