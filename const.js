export const BLOCK_SIZE = 20;
export const BOARD_WIDTH = 14;
export const BOARD_HEIGHT = 30;

export const EVENT_MOVEMENTS = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};
export const UP_BUTTON = document.getElementById("up");
export const LEFT_BUTTON = document.getElementById("left");
export const RIGHT_BUTTON = document.getElementById("right");
export const DOWN_BUTTON = document.getElementById("down");

export const GAMEOVER_ALERT = (score) =>
  `Lo Siento...¡Perdiste! Haz obtenido ${score} puntos.`;
export const $section = document.querySelector("section");
export const $score = document.querySelector("span");
