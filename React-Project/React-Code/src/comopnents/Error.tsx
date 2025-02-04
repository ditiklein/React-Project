import { Alert, AlertTitle, Box } from "@mui/material";

interface ErrorMessageProps {
  message: string; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null; 
  return (
    <Box sx={{ margin: 2 }}>
      <Alert severity="error"> 
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;

