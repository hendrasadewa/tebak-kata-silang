import { InputHTMLAttributes } from 'react';
import styles from './LetterCell.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  columnIndex: number;
  rowIndex: number;
}

function LetterCell({ columnIndex, rowIndex, ...rest }: Props) {
  return (
    <input
      className={styles.cell}
      name={`${columnIndex}-${rowIndex}`}
      maxLength={1}
      type="text"
      {...rest}
    />
  );
}

export default LetterCell;
