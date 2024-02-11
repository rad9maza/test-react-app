import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Context } from "../index";

export default function PrivatePage() {
  const store = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = () => {
    store.store.logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 4 }} maxWidth="xs">
        <Typography variant="h2" component="h1" gutterBottom>
          Hello {store.store.user.firstName} {store.store.user.lastName}!
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Out
        </Button>
      </Container>
    </Box>
  );
}
