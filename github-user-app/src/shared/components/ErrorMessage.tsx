import Alert from '@mui/material/Alert';

export const ErrorMessage = ({ message }: { message: string }) => (
  <Alert severity="error" sx={{ mt: 2 }}>{message}</Alert>
);
