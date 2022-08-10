import type { NextPage } from 'next';
import { useEffect } from 'react';

import Plane from '../components/Plane';

import useGameState from '../hooks/useGameState';
import { GameStatus } from '../types/Words';

import styles from '../styles/Home.module.css';
import GameKeyboard from '../components/GameKeyboard';

const Home: NextPage = () => {
  const [state, actions] = useGameState();

  useEffect(() => {
    if (state.status === GameStatus.lose) {
      alert('Haha you lose');
    }

    if (state.status === GameStatus.win) {
      alert('Haha you win');
    }
  }, [state.status]);

  return (
    <div className={styles.gameContainer}>
      <Plane values={state.userAnswer} />
      <div className={styles.controlsContainer}>
        <GameKeyboard
          characterList={state.keyboard}
          onCharacterClick={actions.onGameKeyboardClick}
        />
        <p>&copy; Hendra Sadewa</p>
      </div>
    </div>
  );
};

export default Home;
