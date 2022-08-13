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

export enum GameResult {
  lose = 'lose',
  win = 'win',
  noresult = 'noresult',
}

export enum GameStatus {
  initial = 'initial',
  started = 'started',
  onprogress = 'onprogress',
  stopped = 'stopped',
  lose = 'lose',
  win = 'win',
}

export type GameKeyboardState = {
  letter: string;
  isDisabled: boolean;
  status: GameKeyboardStatus;
};
