import type { NextPage } from 'next';

import Plane from '../components/Plane';

import useGameState from '../hooks/useGameState';

import styles from '../styles/Home.module.css';
import GameKeyboard from '../components/GameKeyboard';
import Indicators from '../components/Indicators';
import Head from 'next/head';

const Home: NextPage = () => {
  const [state, actions] = useGameState();

  return (
    <div>
      <Head>
        <title>Tebak Kata Silang | hendrasadewa</title>
        <meta name="description" content="Game tebak kata silang" />
      </Head>
      <header>
        <h1 className={styles.title}>Tebak Kata Silang</h1>
      </header>
      <main className={styles.gameContainer}>
        <Plane values={state.userAnswer} />
        <div className={styles.controlsContainer}>
          <Indicators
            chances={state.incorrectAnswerChances}
            status={state.status}
          />
          <GameKeyboard
            characterList={state.keyboard}
            onCharacterClick={actions.onGameKeyboardClick}
          />
        </div>
      </main>
      <footer className={styles.footerContainer}>
        &copy; Hendra Sadewa
        <div className={styles.socialLinks}>
          <a href="https://github.com/hendrasadewa">GitHub</a> &bull;
          <a href="https://www.linkedin.com/in/hendra-sadewa/">LinkedIn</a>{' '}
          &bull;
          <a href="https://saweria.co/hare">Saweria</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
