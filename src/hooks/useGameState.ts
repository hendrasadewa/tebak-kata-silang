import { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

import gameReducer, {
  gameActions,
  gameInitialState,
  GameState,
} from '../store/gameReducer';

import keyboardReducer, {
  keyboardActions,
  keyboardInitialState,
  KeyboardState,
} from '../store/keyboardReducer';

import { Answer, GameResult, GameStatus } from '../types/Words';

import { checkChoice, compareGameAnswers } from '../utils/gameUtils';

interface State extends GameState, KeyboardState {}

type ReturnType = [
  State,
  {
    handleUserAnswer: (letter: string) => void;
  }
];

function useGameState(answer: Answer, keyboardLayout: string): ReturnType {
  // reducers
  const [keyboardState, keyboardDispatch] = useImmerReducer(
    keyboardReducer,
    keyboardInitialState
  );
  const [gameState, gameDispatch] = useImmerReducer(
    gameReducer,
    gameInitialState
  );

  // states
  const { correctAnswer, chances, userAnswer } = gameState;

  // state changes listeners
  useEffect(() => {
    if (!correctAnswer || !userAnswer) {
      gameDispatch(gameActions.loadAnswer(answer));
      keyboardDispatch(keyboardActions.loadKeyboard(keyboardLayout));
    }
  }, [
    keyboardDispatch,
    gameDispatch,
    answer,
    keyboardLayout,
    userAnswer,
    correctAnswer,
  ]);

  useEffect(() => {
    if (chances <= 0) {
      gameDispatch(gameActions.setResult(GameResult.lose));
      keyboardDispatch(keyboardActions.disableKeyboard());
      return;
    }
  }, [gameDispatch, keyboardDispatch, chances]);

  useEffect(() => {
    if (!correctAnswer || !userAnswer) {
      return;
    }

    const isAnswerComplete = compareGameAnswers(correctAnswer, userAnswer);
    if (isAnswerComplete) {
      gameDispatch(gameActions.setResult(GameResult.win));
    }
  }, [gameDispatch, keyboardDispatch, chances, correctAnswer, userAnswer]);

  // event handlers
  const handleUserAnswer = (letter: string) => {
    if (!correctAnswer || !userAnswer) {
      return;
    }

    const isCorrect = checkChoice(correctAnswer, letter);

    gameDispatch(gameActions.userAnswer(isCorrect, letter));
    keyboardDispatch(keyboardActions.onItemClick(isCorrect, letter));
  };

  // map
  const mapStateToHooks: State = {
    ...gameState,
    ...keyboardState,
  };
  const mapDispatchToReturn = {
    handleUserAnswer,
  };

  return [mapStateToHooks, mapDispatchToReturn];
}

export default useGameState;
