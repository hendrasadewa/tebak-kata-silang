import { useImmerReducer } from 'use-immer';
import {
  ALPHABET_ARRAY,
  MAX_INCORRECT_ANSWER_CHANCES,
} from '../constants/gameConstants';

import {
  Answer,
  GameKeyboardState,
  GameResult,
  GameStatus,
} from '../types/Words';

import {
  checkChoice,
  checkUserAnswer,
  createGameKeyboard,
  createInitialUserAnswer,
  getGameResult,
  updateKeyboardValue,
} from '../utils/gameUtils';

import { mockAnswer } from '../__mocks__/useGameState.mock';

interface GameState {
  status: GameStatus;
  result: GameResult;
  incorrectAnswerChances: number;
  correctAnswer: Answer;
  userAnswer: Answer;
  keyboard: GameKeyboardState[];
}

const initialState: GameState = {
  status: GameStatus.initial,
  result: GameResult.noresult,
  incorrectAnswerChances: MAX_INCORRECT_ANSWER_CHANCES,
  correctAnswer: mockAnswer,
  userAnswer: createInitialUserAnswer(mockAnswer),
  keyboard: createGameKeyboard(ALPHABET_ARRAY),
};

type GameStateAction = {
  type: 'keyboard_item_click';
  payload: { letter: string };
};

function reducer(draft: GameState = initialState, action: GameStateAction) {
  switch (action.type) {
    case 'keyboard_item_click':
      const isCorrect = checkChoice(draft.correctAnswer, action.payload.letter);
      const chances = !isCorrect
        ? (draft.incorrectAnswerChances = draft.incorrectAnswerChances - 1)
        : draft.incorrectAnswerChances;

      draft.userAnswer = checkUserAnswer(
        draft.correctAnswer,
        draft.userAnswer,
        action.payload.letter
      );

      draft.keyboard = updateKeyboardValue(
        draft.correctAnswer,
        draft.keyboard,
        action.payload.letter
      );

      const result = getGameResult(
        draft.correctAnswer,
        draft.userAnswer,
        chances
      );

      const shouldGameStop = result !== GameResult.noresult;

      if (shouldGameStop) {
        draft.result = result;
        draft.keyboard = draft.keyboard.map((item) => ({
          ...item,
          isDisabled: true,
        }));
        draft.status = shouldGameStop
          ? GameStatus.onprogress
          : GameStatus.stopped;
      }
      break;
  }
}

type ReturnType = [
  GameState,
  {
    onGameKeyboardClick: (letter: string) => void;
  }
];

function useGameState(): ReturnType {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const onGameKeyboardClick = (letter: string) => {
    dispatch({
      type: 'keyboard_item_click',
      payload: { letter },
    });
  };

  const mapDispatchToReturn = {
    onGameKeyboardClick,
  };

  return [state, mapDispatchToReturn];
}

export default useGameState;
