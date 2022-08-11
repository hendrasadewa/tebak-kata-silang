import type { NextPage } from 'next';

import Plane from '../components/Plane';

import useGameState from '../hooks/useGameState';

import styles from '../styles/Home.module.css';
import GameKeyboard from '../components/GameKeyboard';
import Indicators from '../components/Indicators';
import Head from 'next/head';
import Healthbar from '../components/Healthbar';

const Home: NextPage = () => {
  const [state, actions] = useGameState();

  return (
    <div className='bg-slate-100 min-h-screen'>
      <Head>
        <title>Tebak Kata Silang | hendrasadewa</title>
        <meta name="description" content="Game tebak kata silang" />
      </Head>
      <header className="px-4 mx-auto max-w-lg w-full pt-2 pb-4">
        <h1 className="font-bold text-2xl text-center text-slate-700">Tebak Kata Silang</h1>
      </header>
      <main className="px-4 mx-auto max-w-lg w-full pt-2 pb-4">
        <div className="flex justify-between items-center w-full">
          <Indicators status={state.status} />
          <Healthbar chances={state.incorrectAnswerChances} />
        </div>
        <div className="py-2 flex items-center justify-center w-full">
          <Plane values={state.userAnswer} />
        </div>
        <GameKeyboard
          characterList={state.keyboard}
          onCharacterClick={actions.onGameKeyboardClick}
        />
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
