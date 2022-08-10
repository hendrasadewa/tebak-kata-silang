import { GameKeyboardState } from '../types/Words';
import AlphabetButton from './AlphabetButton';
import classNames from './GameKeyboard.module.css';

interface Props {
  characterList: GameKeyboardState[];
  onCharacterClick: (letter: string) => void;
}

function GameKeyboard({ characterList, onCharacterClick }: Props) {
  return (
    <div className={classNames.gameKeyboard}>
      {characterList.map((value) => (
        <AlphabetButton
          key={`button-${value.letter}`}
          letter={value.letter}
          isDisabled={value.isDisabled}
          onClick={onCharacterClick}
          status={value.status}
        />
      ))}
    </div>
  );
}

export default GameKeyboard;
