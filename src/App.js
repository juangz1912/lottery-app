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
    const nombre = this.state.nombre;
    const cedula = this.state.cedula;
    const numeroText = this.state.numeroJugador;
    const loteriaSeleccionada = this.state.loteriaSeleccionada;
    const apuestaText = this.state.apuesta.replace(',', ''); // Elimina las comas de miles

    if (!nombre.match(/^[a-zA-Z]+$/)) {
      this.setState({ resultado: 'El nombre solo debe contener letras.' });
      return;
    }

    if (!cedula.match(/^[0-9]{8,10}$/)) {
      this.setState({
        resultado: 'La cédula debe contener entre 8 y 10 números.',
      });
      return;
    }

    if (!numeroText.match(/^[0-9]+$/)) {
      this.setState({ resultado: 'El número debe contener solo números.' });
      return;
    }

    if (!apuestaText.match(/^[0-9]+$/)) {
      this.setState({
        resultado: 'El valor de apuesta debe contener solo números.',
      });
      return;
    }

    const numeroJugador = parseInt(numeroText, 10);
    const apuesta = parseFloat(apuestaText);

    let numeroLoteria;
    let digitosLoteria;
    switch (loteriaSeleccionada) {
      case '4 números':
        numeroLoteria = Math.floor(Math.random() * 10000);
        digitosLoteria = 4;
        break;
      case '6 números':
        numeroLoteria = Math.floor(Math.random() * 1000000);
        digitosLoteria = 6;
        break;
      case '8 números':
        numeroLoteria = Math.floor(Math.random() * 100000000);
        digitosLoteria = 8;
        break;
      default:
        numeroLoteria = 0;
        digitosLoteria = 0;
        break;
    }

    this.setState({
      numeroMaquina: numeroLoteria,
    });

    if (numeroJugador === numeroLoteria) {
      const factorGanancia =
        loteriaSeleccionada === '4 números'
          ? 3
          : loteriaSeleccionada === '6 números'
          ? 6
          : 20;
      const ganancias = apuesta * factorGanancia;
      const gananciasFormateadas = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(ganancias);

      this.setState({
        resultado: `¡Felicidades! Has ganado ${gananciasFormateadas}.`,
        ganancias,
      });
    } else {
      this.setState({
        resultado: 'Perdiste. Inténtalo de nuevo.',
      });
    }
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
                onChange={(e) =>
                  this.setState({ numeroJugador: e.target.value })
                }
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
                {this.state.resultado && (
                  <Typography>{this.state.resultado}</Typography>
                )}
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
