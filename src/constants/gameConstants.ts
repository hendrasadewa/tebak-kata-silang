import { GameModals } from '../types/Words';

export const MAX_INCORRECT_ANSWER_CHANCES = 3;

export const QWERTY_ARRAY: string = 'qwertyuiopasdfghjklzxcvbnm';
export const ALPHABET_ARRAY: string = 'abcdefghijklmnopqrstuvwxyz';

export const MODALS: Record<GameModals, {title: string }> = {
  [GameModals.help]: {
    title: 'Cara Bermain',
  },
  [GameModals.lose]: {
    title: 'Kamu Kalah',
  },
  [GameModals.win]: {
    title: 'Kamu Menang',
  },
};
