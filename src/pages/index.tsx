import type { NextPage } from 'next';
import { useEffect } from 'react';

import AlphabetButton from '../components/AlphabetButton';
import Plane from '../components/Plane';

import useGameState from '../hooks/useGameState';
import { GameStatus } from '../types/Words';

const Home: NextPage = () => {
  const [state, actions] = useGameState();

  useEffect(() => {
    if (state.status === GameStatus.lose) {
      alert('Haha you lose');
    }

    if (state.status === GameStatus.win) {
      alert('Haha you win');
    }
  }, [state.status])

  return (
    <div>
      <h1>Crosswordle</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '32px',
        }}
      >
        <Plane values={state.userAnswer} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {state.keyboard.map((value) => (
          <AlphabetButton
            key={`button-${value.letter}`}
            letter={value.letter}
            isDisabled={value.isDisabled}
            onClick={actions.onGameKeyboardClick}
            status={value.status}
          />
        ))}
      </div>
      <p>&copy; Hendra Sadewa</p>
    </div>
  );
};

export default Home;
