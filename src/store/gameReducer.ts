import { MAX_INCORRECT_ANSWER_CHANCES } from '../constants/gameConstants';

import { Answer, GameResult, GameStatus } from '../types/Words';

import { createInitialUserAnswer } from '../utils/gameUtils';

export interface GameState {
  status: GameStatus;
  result: GameResult;
  chances: number;
  correctAnswer?: Answer;
  userAnswer?: Answer;
  startTime?: Date;
  stopTime?: Date;
}

export const gameInitialState: GameState = {
  status: GameStatus.initial,
  result: GameResult.noresult,
  chances: MAX_INCORRECT_ANSWER_CHANCES,
  correctAnswer: undefined,
  userAnswer: undefined,
  startTime: undefined,
  stopTime: undefined,
};

type GameAction =
  | {
      type: 'game_load_answer';
      payload: { correctAnswer: Answer };
    }
  | {
      type: 'game_user_answer';
      payload: { letter: string; isCorrect: boolean };
    }
  | {
      type: 'game_set_result';
      payload: { result: GameResult };
    };

function gameReducer(draft: GameState = gameInitialState, action: GameAction) {
  switch (action.type) {
    case 'game_load_answer':
      draft.correctAnswer = action.payload.correctAnswer;
      draft.userAnswer = createInitialUserAnswer(action.payload.correctAnswer);
      draft.status = GameStatus.started;
      draft.startTime = new Date();
      break;

    case 'game_user_answer':
      if (!draft.correctAnswer || !draft.userAnswer) {
        return;
      }

      if (!action.payload.isCorrect) {
        draft.chances = draft.chances - 1;
      }

      draft.userAnswer = draft.userAnswer.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          if (!draft.correctAnswer) {
            return cell;
          }

          const correctLetter = draft.correctAnswer[rowIndex][columnIndex];
          if (correctLetter === action.payload.letter) {
            return action.payload.letter;
          }
          return cell;
        })
      );
      break;

    case 'game_set_result':
      draft.result = action.payload.result;
      if (action.payload.result !== GameResult.noresult) {
        draft.status = GameStatus.stopped;
        draft.stopTime = new Date();
      } else {
        draft.status = GameStatus.onprogress;
      }
      break;
  }
}

export const gameActions = {
  loadAnswer: (correctAnswer: Answer): GameAction => ({
    type: 'game_load_answer',
    payload: { correctAnswer },
  }),
  userAnswer: (isCorrect: boolean, letter: string): GameAction => ({
    type: 'game_user_answer',
    payload: { isCorrect, letter },
  }),
  setResult: (result: GameResult): GameAction => ({
    type: 'game_set_result',
    payload: { result },
  }),
};

export default gameReducer;
