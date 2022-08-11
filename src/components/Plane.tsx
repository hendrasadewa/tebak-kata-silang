import { useState } from 'react';
import { Answer } from '../types/Words';
import LetterCell from './LetterCell';

interface Props {
  values: Answer;
}

function Plane({ values }: Props) {
  const row = values.length;
  const col = values.length > 0 ? values[0].length : 0;

  return (
    <div className={`grid grid-rows-${row} grid-cols-${col}`}>
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
