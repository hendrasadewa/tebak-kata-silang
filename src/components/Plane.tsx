import { useState } from 'react';
import { Answer } from '../types/Words';
import LetterCell from './LetterCell';

interface Props {
  values: Answer;
}

function Plane({ values }: Props) {
  return (
    <div className="flex items-center justify-center flex-col">
      {values.map((row, rowIndex) => (
        <div key={`cell-${rowIndex}`} className="flex">
          {row.map((cell, columnIndex) => (
            <LetterCell
              key={`cell-${columnIndex}-${rowIndex}`}
              value={cell || ''}
              disabled={cell === null}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Plane;
