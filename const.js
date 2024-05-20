const $ = (selector) => document.querySelector(selector);
export const BLOCK_SIZE = 20;
export const BOARD_WIDTH = 14;
export const BOARD_HEIGHT = 30;

export const EVENT_MOVEMENTS = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};
export const UP_BUTTON = $("#up");
export const LEFT_BUTTON = $("#left");
export const RIGHT_BUTTON = $("#right");
export const DOWN_BUTTON = $("#down");

export const GAMEOVER_ALERT = (score) =>
  `Lo Siento...¡Perdiste! Haz obtenido ${score} puntos.`;
export const $section = $("section");
export const $score = $("span");
export const pauseButton = $("#pause-button");
export const playButton = $("#play-button");
export const forwardButton = $("#forward-button");
export const backwardButton = $("#backward-button");
