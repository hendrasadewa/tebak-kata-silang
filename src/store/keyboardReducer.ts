import { ALPHABET_ARRAY } from '../constants/gameConstants';

import { GameKeyboardState, GameKeyboardStatus } from '../types/Words';

import { createGameKeyboard } from '../utils/keyboardUtils';

export interface KeyboardState {
  keyboardLayout: string;
  keyboard: GameKeyboardState[];
}

export const keyboardInitialState: KeyboardState = {
  keyboardLayout: ALPHABET_ARRAY,
  keyboard: [],
};

type KeyboardAction =
  | {
      type: 'keyboard_load';
      payload: { layout: string };
    }
  | {
      type: 'keyboard_disable';
    }
  | {
      type: 'keyboard_item_click';
      payload: { letter: string; isCorrect: boolean };
    };

function keyboardReducer(
  draft: KeyboardState = keyboardInitialState,
  action: KeyboardAction
) {
  switch (action.type) {
    case 'keyboard_load':
      draft.keyboardLayout = action.payload.layout;
      draft.keyboard = createGameKeyboard(action.payload.layout);
      break;

    case 'keyboard_disable':
      draft.keyboard = draft.keyboard.map((element) => ({
        ...element,
        isDisabled: true,
      }));
      break;

    case 'keyboard_item_click':
      draft.keyboard = draft.keyboard.map((element) => {
        if (element.letter === action.payload.letter) {
          return {
            letter: action.payload.letter,
            isDisabled: true,
            status: action.payload.isCorrect
              ? GameKeyboardStatus.correct
              : GameKeyboardStatus.incorrect,
          };
        }
        return element;
      });
      break;
  }
}

export const keyboardActions = {
  loadKeyboard: (layout: string = ALPHABET_ARRAY): KeyboardAction => ({
    type: 'keyboard_load',
    payload: { layout },
  }),
  onItemClick: (isCorrect: boolean, letter: string): KeyboardAction => ({ 
    type: 'keyboard_item_click',
    payload: { isCorrect, letter }
  }),
  disableKeyboard: (): KeyboardAction => ({
    type: 'keyboard_disable',
  })
};

export default keyboardReducer;
