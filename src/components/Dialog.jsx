import { Stack, Button } from "@mui/material";

export const Dialog = ({ message, onDialog }) => {
  return (
    <Stack>
      <Stack justifyContent="center" alignItems="center" color="GrayText">
        <h3>{message}</h3>
        <Stack justifyContent="center" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onDialog(true)}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => onDialog(false)}
          >
            NO
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Dialog;
