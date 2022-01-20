import { Container, Grid, Typography } from "@mui/material";
import './App.css';
import PlayGround from "./PlayGround";

function App() {
  return (
    <div className="App">
      <Container sx={{ margin: '2%' }}>
        <Grid container sm={12} xs={12} justifyContent="center" spacing={2}>
          <Grid item sm={12} xs={12} md={12}>
            <Typography variant="h4">
              Tic Tac Toe
            </Typography>
          </Grid>
          <PlayGround />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
