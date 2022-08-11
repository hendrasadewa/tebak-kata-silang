import { GameKeyboardState } from '../types/Words';
import AlphabetButton from './AlphabetButton';

interface Props {
  characterList: GameKeyboardState[];
  onCharacterClick: (letter: string) => void;
}

function GameKeyboard({ characterList, onCharacterClick }: Props) {
  return (
    <div className="grid grid-cols-10 w-full gap-1 px-2">
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
