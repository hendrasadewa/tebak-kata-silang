import { motion } from 'framer-motion';

interface Props {
  value: string;
  disabled: boolean;
}

function LetterCell({ value, disabled }: Props) {
  return (
    <motion.div
      className={` ${
        !disabled ? 'bg-slate-50' : 'bg-slate-500'
      } flex items-center justify-center w-10 h-10 text-slate-600 font-bold text-center border border-slate-500 rounded-md m-0.5`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.8 }}
    >
      {value}
    </motion.div>
  );
}

export default LetterCell;
