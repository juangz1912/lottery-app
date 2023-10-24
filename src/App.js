import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      cedula: '',
      loteriaSeleccionada: '4 números',
      numeroJugador: '',
      apuesta: '',
      resultado: '',
      numeroMaquina: null,
      ganancias: 0,
    };
  }

  jugarLoteria = () => {
    // Implement the logic for playing the lottery here
    // You can use this.state to access the form inputs and update the results
    // For example, set this.state.resultado with the result message.
  };

  reiniciarJuego = () => {
    this.setState({
      resultado: '',
      numeroMaquina: null,
      ganancias: 0,
    });
  };

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4">Loteria App</Typography>
            {/* Add your logo here */}
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={this.state.nombre}
                onChange={(e) => this.setState({ nombre: e.target.value })}
              />
              <TextField
                label="Cedula (8-10 números)"
                variant="outlined"
                fullWidth
                value={this.state.cedula}
                onChange={(e) => this.setState({ cedula: e.target.value })}
              />
              <Select
                label="Loteria"
                variant="outlined"
                fullWidth
                value={this.state.loteriaSeleccionada}
                onChange={(e) =>
                  this.setState({ loteriaSeleccionada: e.target.value })
                }
              >
                <MenuItem value="4 números">4 números</MenuItem>
                <MenuItem value="6 números">6 números</MenuItem>
                <MenuItem value="8 números">8 números</MenuItem>
              </Select>
              <TextField
                label="Tu número"
                variant="outlined"
                fullWidth
                value={this.state.numeroJugador}
                onChange={(e) => this.setState({ numeroJugador: e.target.value })}
              />
              <TextField
                label="Valor de apuesta ($)"
                variant="outlined"
                fullWidth
                value={this.state.apuesta}
                onChange={(e) => this.setState({ apuesta: e.target.value })}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.jugarLoteria}
              >
                Jugar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => window.location.reload()}
              >
                Cerrar
              </Button>
              <div>
                {this.state.resultado && <Typography>{this.state.resultado}</Typography>}
                {this.state.numeroMaquina && (
                  <Typography>
                    Número de la lotería de{' '}
                    {this.state.loteriaSeleccionada.split(' ')[0]} números:{' '}
                    {this.state.numeroMaquina}
                  </Typography>
                )}
                {this.state.ganancias > 0 && (
                  <Typography>
                    ¡Felicidades! Has ganado ${this.state.ganancias}.
                  </Typography>
                )}
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.reiniciarJuego}
                disabled={this.state.ganancias === 0}
              >
                Volver a Jugar
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
