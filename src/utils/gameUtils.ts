import { ALPHABET_ARRAY } from '../constants/gameConstants';
import { Answer, GameKeyboardState, GameKeyboardStatus } from '../types/Words';

export function createInitialUserAnswer(answer: Answer) {
  return [...Array(answer.length)].map((_, rowIndex) =>
    Array(answer[rowIndex].length)
      .fill(null)
      .map((_, colIndex) => (answer[rowIndex][colIndex] !== null ? '' : null))
  );
}

export function createGameKeyboard(
  letters: string[] = ALPHABET_ARRAY
): GameKeyboardState[] {
  return letters.map((letter) => ({
    letter: letter.toLowerCase(),
    isDisabled: false,
    status: GameKeyboardStatus.initial,
  }));
}

export function checkUserAnswer(
  correctAnswer: Answer,
  userAnswer: Answer,
  letter: string
) {
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

export function checkChoice(answer: Answer, letter: string) {
  return answer.some((row) => row.join().indexOf(letter) >= 0);
}

export function updateKeyboardValue(
  correctAnswer: Answer,
  keyboard: GameKeyboardState[],
  letter: string
) {
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

export function compareGameAnswers(correctAnswer: Answer, userAnswer: Answer) {
  const joinUserAnswer = (row: (string | null)[]) =>
    row.filter((letter) => letter).join();

  const joinedCorrectAnswer = correctAnswer.map(joinUserAnswer).join();
  const joinedUserAnswer = userAnswer.map(joinUserAnswer).join();

  return joinedCorrectAnswer === joinedUserAnswer;

}
