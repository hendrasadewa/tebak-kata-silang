import { useState } from 'react';
import { Answer } from '../types/Words';
import LetterCell from './LetterCell';

interface Props {
  values: Answer;
}

function Plane({ values }: Props) {
  const row = values.length;
  const col = values.length > 0 ? values[0].length : 0;
  const templateClassName = `grid gap-0.5 grid-rows-${row} grid-cols-${col} w-fit`;

  return (
    <div className={templateClassName}>
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
