import { motion } from 'framer-motion';
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

  const className = 'min-w-fit h-10 rounded-md text-center'.split(' ');

  if (!isDisabled) {
    className.push('cursor-pointer');
  }

  if (status === GameKeyboardStatus.correct) {
    className.push('bg-slate-500 text-slate-100');
  }

  if (status === GameKeyboardStatus.initial) {
    className.push('bg-slate-200 text-slate-800');
  }

  if (status === GameKeyboardStatus.incorrect) {
    className.push('bg-slate-100 text-slate-400');
  }

  return (
    <motion.div
      className={className.join(' ')}
      whileHover={
        !isDisabled
          ? {
              y: -2,
              z: 4,
            }
          : {}
      }
      whileTap={{ scale: 0.8 }}
      initial={{
        y: 0,
      }}
    >
      <button
        className="flex items-center justify-center w-full h-full"
        onClick={handleClick}
        disabled={isDisabled}
      >
        {letter}
      </button>
    </motion.div>
  );
}

export default AlphabetButton;
