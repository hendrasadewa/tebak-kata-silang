import type { NextPage } from 'next';

import Plane from '../components/Plane';

import useGameState from '../hooks/useGameState';

import styles from '../styles/Home.module.css';
import GameKeyboard from '../components/GameKeyboard';
import Help from '../components/Help';
import Head from 'next/head';
import Healthbar from '../components/Healthbar';
import HelpModal from '../components/HelpModal';
import { useEffect, useState } from 'react';
import BaseModal from '../components/BaseModal';
import LoseModal from '../components/LoseModal';
import { GameStatus } from '../types/Words';
import WinModal from '../components/WinModal';

const Home: NextPage = () => {
  const [state, actions] = useGameState();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Cara Bermain');

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOpenHowtoPlay = () => {
    setModalTitle('Cara Bermain');
    setModalOpen(true);
  };

  useEffect(() => {
    if (state.status === GameStatus.lose) {
      setModalTitle('Kalah');
      setModalOpen(true);
    }
    if (state.status === GameStatus.win) {
      setModalTitle('Menang');
      setModalOpen(true);
    }
  }, [state.status]);

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col h-screen justify-between">
      <Head>
        <title>Tebak Kata Silang | hendrasadewa</title>
        <meta name="description" content="Game tebak kata silang" />
      </Head>

      <BaseModal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalTitle === 'Cara Bermain' && <HelpModal onClose={closeModal} />}
        {modalTitle === 'Kalah' && (
          <LoseModal onClose={closeModal} />
        )}
        {modalTitle === 'Menang' && (
          <WinModal onClose={closeModal} />
        )}
      </BaseModal>
      <header className="px-4 mx-auto max-w-lg w-full pt-2 pb-4 border-b border-b-slate-300 bg-slate-50">
        <h1 className="font-bold text-2xl text-center text-slate-600">
          Tebak Kata Silang
        </h1>
      </header>
      <main className="px-4 mx-auto max-w-lg w-full pt-2 pb-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-center w-full">
          <Help onClick={handleOpenHowtoPlay} />
          <Healthbar chances={state.incorrectAnswerChances} />
        </div>
        <div className="py-2 flex items-center justify-center w-full">
          <Plane values={state.userAnswer} />
        </div>
        <div>
          <GameKeyboard
            characterList={state.keyboard}
            onCharacterClick={actions.onGameKeyboardClick}
          />
        </div>
      </main>
      <footer className="bg-slate-700 flex items-center flex-col text-slate-100 py-4">
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
