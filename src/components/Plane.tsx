import { useState } from 'react';
import { Answer } from '../types/Words';
import LetterCell from './LetterCell';
import styles from './Plane.module.css';

interface Props {
  values: Answer;
}

function Plane({ values }: Props) {
  const rows = values.length;
  const columns = values.length > 0 ? values[0].length : 0;

  return (
    <div className={styles.plane} style={{
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    }}>
      {values.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <LetterCell
            key={`cell-${columnIndex}-${rowIndex}`}
            value={cell || ''}
            disabled={cell === null}
          />
        ))
      )}
    </div>
  );
}

export default Plane;
