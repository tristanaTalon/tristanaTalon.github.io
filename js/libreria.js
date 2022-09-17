const d = document;

const condicionesDeVictoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [0, 3, 6],
  [2, 4, 6],
];

const cuadriculas = 9;

let x = [];

let o = [];

let ocupados = [];

const imagenes = ["../img/x.PNG", "../img/o.PNG"];

let turno = "x";

let jugadasBloqueadas = false;

function _interacturaConCuadricula(identificador) {
  if (!_estaOcupado(identificador) && !jugadasBloqueadas) {
    _dibujarPiezaEnCanvas(identificador);
    _asignarPiezaAJugador(identificador);
    _finDeUnaJugada();
  }
}

function _asignarPiezaAJugador(identificador) {
  turno === "x" ? x.push(identificador) : o.push(identificador);
  _agregarPiezaAOcupados(identificador);
}

function _alternarJugador() {
  turno === "x" ? (turno = "o") : (turno = "x");
}

function _dibujarPiezaEnCanvas(identificador) {
  const imagen = turno === "x" ? imagenes[0] : imagenes[1];
  d.getElementById("cuadricula" + identificador).style.backgroundImage =
    "url('" + imagen + "')";
}

function _estaOcupado(identificador) {
  for (let i = 0; i < ocupados.length; i++)
    if (ocupados[i] == identificador) return true;
  return false;
}

function _agregarPiezaAOcupados(identificador) {
  ocupados.push(identificador);
}

function _tresEnRaya() {
  const posicionesJugadorActual = turno === "x" ? x : o;
  for (let i = 0; i < condicionesDeVictoria.length; i++) {
    let tresEnRaya = true;
    for (let j = 0; j < condicionesDeVictoria[i].length; j++)
      tresEnRaya =
        tresEnRaya &&
        _incluye(posicionesJugadorActual, condicionesDeVictoria[i][j]);

    if (tresEnRaya) return tresEnRaya;
  }
  return false;
}

function _empate() {
  return !_tresEnRaya() && ocupados.length === 9;
}

function _incluye(array, elemento) {
  for (let i = 0; i < array.length; i++) if (elemento == array[i]) return true;
  return false;
}

function _mostrarGanador() {
  const articulo = turno === "x" ? "la" : "el";
  //   console.log("Ha ganado " + articulo + " " + turno);
  d.getElementById("mensaje").innerHTML = "Ha ganado " + articulo + " " + turno;
}

function _mostrarEmpate() {
  //   console.log("Empate");
  d.getElementById("mensaje").innerHTML = "Empate";
}

function _mostrarTurno() {
  const articulo = turno === "x" ? " la" : "l";
  d.getElementById("mensaje").innerHTML =
    "Es el turno de" + articulo + " " + turno;
}

function _finDeUnaJugada() {
  if (_tresEnRaya()) {
    _mostrarGanador();
    _bloquearMovimientos();
  } else if (_empate()) {
    _mostrarEmpate();
    _bloquearMovimientos();
  } else {
    _alternarJugador();
    _mostrarTurno();
  }
}

function _bloquearMovimientos() {
  jugadasBloqueadas = true;
}

function _empezarNuevaPartida() {
  x = [];
  o = [];
  ocupados = [];
  jugadasBloqueadas = false;
  _limpiarCanvas();
  _mostrarTurno();
}

function _limpiarCanvas() {
  for (let i = 0; i < cuadriculas; i++)
    d.getElementById("cuadricula" + i).style.backgroundImage = "none";
}

_mostrarTurno();

// function _mostrar() {
//   console.log("X array");
//   for (let i = 0; i < x.length; i++) console.log(x[i]);
//   console.log("O array");
//   for (let i = 0; i < o.length; i++) console.log(o[i]);
//   console.log("OCUPADOS array");
//   for (let i = 0; i < ocupados.length; i++) console.log(ocupados[i]);
//   console.log("TURNO");
//   console.log(turno);
//   console.log("BLOQUEADO");
//   console.log(jugadasBloqueadas);
// }
