import { QWERTY_ARRAY } from '../constants/gameConstants';
import { GameKeyboardState, GameKeyboardStatus } from '../types/Words';

export function createGameKeyboard(
  letters: string = QWERTY_ARRAY
): GameKeyboardState[] {
  return letters
    .split('')
    .map((word) => word.split('').map((letter) => letter))
    .reduce((prev, curr) => [...prev, ...curr], [])
    .map((letter) => ({
      letter: letter.toLowerCase(),
      isDisabled: false,
      status: GameKeyboardStatus.initial,
    }));
}
