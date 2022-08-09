import { useState } from 'react';
import { Answer } from '../types/Words';
import LetterCell from './LetterCell';
import styles from './Plane.module.css';

interface Props {
  values: Answer;
}

function Plane({ values }: Props) {
  return (
    <div className={styles.plane}>
      {values.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className={styles.row}>
          {row.map((cell, columnIndex) => (
            <LetterCell
              defaultValue={cell || ''}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
              key={`cell-${columnIndex}-${rowIndex}`}
              disabled={cell === null}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Plane;
