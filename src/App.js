import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const cardStyle = {
  background:
    "url('https://es.pngtree.com/freebackground/close-up-3d-rendering-of-a-classic-casino-roulette-table-with-a-computer-keyboard-and-a-casino-sign-in-the-background_5584580.html') no-repeat center center fixed",
  backgroundSize: "contain",
  opacity: "1",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20px",
  paddingBottom: "0px",
  height: "100%",
};

const textFieldStyle = {
  marginBottom: "10px", // Agrega espacio entre los campos
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between", // Para colocar los botones en la misma línea
  alignItems: "center",
  marginTop: "10px",
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      cedula: "",
      loteriaSeleccionada: "4 números",
      numeroJugador: "",
      apuesta: "",
      resultado: "",
      numeroMaquina: null,
      ganancias: 0,
    };
  }

  jugarLoteria = () => {
    const nombre = this.state.nombre;
    const cedula = this.state.cedula;
    const numeroText = this.state.numeroJugador;
    const loteriaSeleccionada = this.state.loteriaSeleccionada;
    const apuestaText = this.state.apuesta.replace(",", ""); // Elimina las comas de miles

    if (!nombre.match(/^[a-zA-Z\s]+$/)) {
      this.setState({ resultado: "El nombre solo debe contener letras." });
      return;
    }

    if (!cedula.match(/^[0-9]{6,15}$/)) {
      this.setState({
        resultado: "Ingresa una cédula válida de 6 a 15 dígitos.",
      });
      return;
    }

    if (!numeroText.match(/^[0-9]+$/)) {
      this.setState({ resultado: "El número debe contener solo números." });
      return;
    }

    // Validar que el número del jugador tenga la misma cantidad de dígitos que seleccionó
    const digitosLoteria =
      loteriaSeleccionada === "4 números"
        ? 4
        : loteriaSeleccionada === "6 números"
        ? 6
        : loteriaSeleccionada === "8 números"
        ? 8
        : 0;

    if (numeroText.length !== digitosLoteria) {
      this.setState({
        resultado: `El número debe tener ${digitosLoteria} dígitos para la lotería seleccionada.`,
      });
      return;
    }

    if (!apuestaText.match(/^[0-9]+$/)) {
      this.setState({
        resultado: "El valor de apuesta debe contener solo números.",
      });
      return;
    }

    const numeroJugador = parseInt(numeroText, 10);
    const apuesta = parseFloat(apuestaText);

    const min = Math.pow(10, digitosLoteria - 1);
    const max = Math.pow(10, digitosLoteria) - 1;
    let numeroLoteria = Math.floor(min + Math.random() * (max - min + 1)); // Generar números con la cantidad de dígitos seleccionada

    this.setState({
      numeroMaquina: numeroLoteria,
    });

    this.setState({
      numeroMaquina: numeroLoteria,
    });

    if (numeroJugador === numeroLoteria) {
      const factorGanancia =
        loteriaSeleccionada === "4 números"
          ? 3
          : loteriaSeleccionada === "6 números"
          ? 6
          : 20;
      const ganancias = apuesta * factorGanancia;
      const gananciasFormateadas = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(ganancias);

      this.setState({
        resultado: `¡Felicidades! Has ganado ${gananciasFormateadas}.`,
        ganancias,
      });
    } else {
      this.setState({
        resultado: "Perdiste. Inténtalo de nuevo.",
      });
    }
  };

  render() {
    return (
      <div style={cardStyle}>
        <Grid container spacing={2} style={formStyle}>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={this.state.nombre}
                onChange={(e) => this.setState({ nombre: e.target.value })}
                style={textFieldStyle}
              />
              <TextField
                label="Cédula"
                variant="outlined"
                fullWidth
                value={this.state.cedula}
                onChange={(e) => this.setState({ cedula: e.target.value })}
                style={textFieldStyle}
              />
              <Select
                label="Lotería"
                variant="outlined"
                fullWidth
                value={this.state.loteriaSeleccionada}
                onChange={(e) =>
                  this.setState({ loteriaSeleccionada: e.target.value })
                }
                style={textFieldStyle}
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
                style={textFieldStyle}
              />
              <TextField
                label="Valor de apuesta ($)"
                variant="outlined"
                fullWidth
                value={this.state.apuesta}
                onChange={(e) => this.setState({ apuesta: e.target.value })}
                style={textFieldStyle}
              />
              <div style={buttonContainerStyle}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "orange", color: "white" }}
                  onClick={this.jugarLoteria}
                >
                  ¡Jugar!
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "blue", color: "white" }}
                  onClick={() => window.location.reload()}
                >
                  Cerrar
                </Button>
              </div>
              <div>
                {this.state.resultado && (
                  <Typography>{this.state.resultado}</Typography>
                )}
                {this.state.numeroMaquina && (
                  <Typography>
                    Número de la lotería de{" "}
                    {this.state.loteriaSeleccionada.split(" ")[0]} números:{" "}
                    {this.state.numeroMaquina}
                  </Typography>
                )}
                {this.state.ganancias > 0 && (
                  <Typography>
                    ¡Felicidades! Has ganado{" "}
                    {this.state.ganancias > 1 ? "$" : "un dólar"}
                    {this.state.ganancias}.
                  </Typography>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  enable={this.state.ganancias === 0}
                  onClick={this.jugarLoteria}
                >
                  Volver a Jugar
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
