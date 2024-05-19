import "./style.css";
import {
  BLOCK_SIZE,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  EVENT_MOVEMENTS,
  GAMEOVER_ALERT,
  $section,
  $score,
  UP_BUTTON,
  LEFT_BUTTON,
  RIGHT_BUTTON,
  DOWN_BUTTON,
} from "./const";

const $body = document.body;

// 1. Inicializa el canvas
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let score = 0;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

// .2 Board (Tablero)
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);

function createBoard(width, height) {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(0));
}

// 3. Player Piece (Piezas del jugador)
const piece = {
  position: { x: 0, y: 0 },
  shape: [
    [1, 1],
    [1, 1],
  ],
};

// 4. Ramdom Pieces (Piezas al azar) - Matrices
const PIECES = [
  [
    [1, 1],
    [1, 1],
  ],
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
];

// 5. Auto Drop (Caída automática)
let dropCounter = 0;
let lastTime = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.position.y++;
    dropCounter = 0;
  }

  if (checkCollision()) {
    piece.position.y--;
    solidifyPiece();
    removeRows();
  }

  draw();
  window.requestAnimationFrame(update);
}

// Draw on Canvas (Dibujar las piezas en el Canvas)
function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = "grey";
        context.fillRect(x, y, 1, 1);
      }
    });
  });
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = "yellow";
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });

  $score.innerText = score;
}

// Keyboards functions (Teclas)
function movePieceLeft() {
  piece.position.x--;
  if (checkCollision()) {
    piece.position.x++;
  }
}

function movePieceRight() {
  piece.position.x++;
  if (checkCollision()) {
    piece.position.x--;
  }
}

function movePieceDown() {
  piece.position.y++;
  if (checkCollision()) {
    piece.position.y--;
    solidifyPiece();
    removeRows();
  }
}

function rotatePieces() {
  const rotated = [];

  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = [];

    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i]);
    }

    rotated.push(row);
  }

  const previousShape = piece.shape;
  piece.shape = rotated;
  if (checkCollision()) {
    piece.shape = previousShape;
  }
}

// Se agregan botones para dispositivos móviles
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", (event) => {
    if (event.key === EVENT_MOVEMENTS.LEFT) {
      movePieceLeft();
    } else if (event.key === EVENT_MOVEMENTS.RIGHT) {
      movePieceRight();
    } else if (event.key === EVENT_MOVEMENTS.DOWN) {
      movePieceDown();
    } else if (event.key === EVENT_MOVEMENTS.UP) {
      rotatePieces();
    }
  });

  LEFT_BUTTON.addEventListener("click", movePieceLeft);
  RIGHT_BUTTON.addEventListener("click", movePieceRight);
  DOWN_BUTTON.addEventListener("click", movePieceDown);
  UP_BUTTON.addEventListener("click", rotatePieces);
});

function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}

// Solidify piece (Solidificar las piezas al colisionar)
function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1;
      }
    });
  });

  // Reset Position (Resetear posición)
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2);
  piece.position.y = 0;
  // Get ramdom pieces (Obtener piezas al azar)
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];
  // Gameover (Perdiste el juego)
  if (checkCollision()) {
    board.forEach((row) => row.fill(0));
    alert(GAMEOVER_ALERT(score));
  }
}

// Remover las filas
function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      rowsToRemove.push(y);
    }
  });

  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    const newRow = Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
    score += 10;
  });
}

// Play music list (Reproducir música tetris al comenzar)
$section.addEventListener("click", () => {
  update();
  $section.remove();

  const playlist = [
    { src: "/Willy Crook - Soul_Driver.mp3", volume: 0.6 },
    { src: "/willy crook & funky torinos - Play Your Game.mp3", volume: 0.8 },
    { src: "/Willy Crook - Evil ways.mp3", volume: 0.7 },
  ];

  let currentTrack = 0;

  function playNextTrack() {
    const track = playlist[currentTrack];
    const audio = new window.Audio(track.src);
    audio.volume = track.volume;
    audio.play();

    audio.onended = () => {
      currentTrack = (currentTrack + 1) % playlist.length; // Pasar al siguiente tema
      playNextTrack();
    };

    const pauseButton = document.querySelector("#pause-button");
    if (pauseButton) {
      pauseButton.addEventListener("click", () => {
        audio.pause();
      });
    }
    const playButton = document.querySelector("#play-button");
    if (playButton) {
      playButton.addEventListener("click", () => {
        audio.play();
      });
    }
  }

  playNextTrack();
});
