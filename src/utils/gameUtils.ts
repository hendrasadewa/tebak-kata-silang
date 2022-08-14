import { ALPHABET_ARRAY, QWERTY_ARRAY } from '../constants/gameConstants';
import {
  Answer,
  GameKeyboardState,
  GameKeyboardStatus,
  GameResult,
} from '../types/Words';

export function createInitialUserAnswer(answer: Answer) {
  return [...Array(answer.length)].map((_, rowIndex) =>
    Array(answer[rowIndex].length)
      .fill(null)
      .map((_, colIndex) => (answer[rowIndex][colIndex] !== null ? '' : null))
  );
}


export function checkUserAnswer(
  correctAnswer: Answer,
  userAnswer: Answer,
  letter: string
): Answer {
  return userAnswer.map((row, rowIndex) =>
    row.map((currentCell, columnIndex) => {
      if (currentCell === null) {
        return currentCell;
      }

      const answerCandidate = correctAnswer[rowIndex][columnIndex];

      return letter === answerCandidate ? letter : currentCell;
    })
  );
}

export function checkChoice(answer: Answer, letter: string): boolean {
  return answer.some((row) => row.join().indexOf(letter) >= 0);
}

export function updateKeyboardValue(
  correctAnswer: Answer,
  keyboard: GameKeyboardState[],
  letter: string
): GameKeyboardState[] {
  const isCorrect = checkChoice(correctAnswer, letter);
  return keyboard.map((value) => {
    if (value.letter === letter) {
      return {
        letter,
        isDisabled: true,
        status: isCorrect
          ? GameKeyboardStatus.correct
          : GameKeyboardStatus.incorrect,
      };
    }
    return value;
  });
}

export function compareGameAnswers(
  correctAnswer: Answer,
  userAnswer: Answer
): boolean {
  const joinUserAnswer = (row: (string | null)[]) =>
    row.filter((letter) => letter).join();

  const joinedCorrectAnswer = correctAnswer.map(joinUserAnswer).join();
  const joinedUserAnswer = userAnswer.map(joinUserAnswer).join();

  return joinedCorrectAnswer === joinedUserAnswer;
}

export function getGameResult(
  correctAnswer: Answer,
  userAnswer: Answer,
  chances: number
) {
  const isUserAnswersCorrect = compareGameAnswers(correctAnswer, userAnswer);
  if (isUserAnswersCorrect) {
    return GameResult.win;
  } else if (chances <= 0) {
    return GameResult.lose;
  }
  return GameResult.noresult;
}
