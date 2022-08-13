export type Answer = (string | null)[][];

export enum GameKeyboardStatus {
  initial = 'initial',
  correct = 'correct',
  incorrect = 'incorrect',
}

export enum GameModals {
  help = 'helpModal',
  win = 'winModal',
  lose = 'loseModal',
}

export enum GameStatus {
  started = 'started',
  lose = 'lose',
  win = 'win',
}

export type GameKeyboardState = {
  letter: string;
  isDisabled: boolean;
  status: GameKeyboardStatus;
};
