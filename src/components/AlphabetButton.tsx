import { GameKeyboardStatus } from '../types/Words';
import styles from './AlphabetButton.module.css';

interface Props {
  isDisabled: boolean;
  letter: string;
  status: GameKeyboardStatus;
  onClick: (letter: string) => void;
}

function AlphabetButton({ isDisabled, letter, status, onClick }: Props) {
  const handleClick = () => {
    onClick(letter);
  };

  return (
    <button
      className={[styles.alphabetButton, styles[status]].join(' ')}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {letter}
    </button>
  );
}

export default AlphabetButton;
