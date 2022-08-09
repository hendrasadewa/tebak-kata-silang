export type Answer = (string | null)[][];

export enum GameKeyboardStatus {
  initial = 'initial',
  correct = 'correct',
  incorrect = 'incorrect',
}

export enum GameStatus {
  started = 'started',
  lose = 'lose',
  win = 'win'
}

export type GameKeyboardState = {
  letter: string;
  isDisabled: boolean;
  status: GameKeyboardStatus;
};
