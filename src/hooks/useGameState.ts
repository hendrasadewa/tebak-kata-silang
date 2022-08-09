import { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import {
  ALPHABET_ARRAY,
  MAX_INCORRECT_ANSWER_CHANCES,
} from '../constants/gameConstants';

import { Answer, GameKeyboardState, GameStatus } from '../types/Words';

import {
  checkChoice,
  checkUserAnswer,
  compareGameAnswers,
  createGameKeyboard,
  createInitialUserAnswer,
  updateKeyboardValue,
} from '../utils/gameUtils';

import { mockAnswer } from '../__mocks__/useGameState.mock';

interface GameState {
  status: GameStatus;
  incorrectAnswerChances: number;
  correctAnswer: Answer;
  userAnswer: Answer;
  keyboard: GameKeyboardState[];
}

const initialState: GameState = {
  status: GameStatus.started,
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

      const status = compareGameAnswers(draft.correctAnswer, draft.userAnswer)
        ? GameStatus.win
        : chances <= 0
        ? GameStatus.lose
        : GameStatus.started;

      if (status === GameStatus.win || status === GameStatus.lose) {
        draft.keyboard = draft.keyboard.map((item) => ({
          ...item,
          isDisabled: true,
        }));
      }

      draft.status = status;
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
