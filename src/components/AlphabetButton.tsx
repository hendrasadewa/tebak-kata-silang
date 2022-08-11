import { GameKeyboardStatus } from '../types/Words';

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

  const className =
    'cursor-pointer min-w-fit h-10 rounded-md text-center'.split(' ');

  if (status === GameKeyboardStatus.correct) {
    className.push('bg-slate-500 text-slate-100')
  }

  if (status === GameKeyboardStatus.initial) {
    className.push('bg-slate-200 text-slate-800');
  }

  if (status=== GameKeyboardStatus.incorrect) {
    className.push('bg-slate-100 text-slate-400');
  }

  return (
    <button
      className={className.join(' ')}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {letter}
    </button>
  );
}

export default AlphabetButton;
