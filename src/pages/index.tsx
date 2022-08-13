import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import Plane from '../components/Plane';
import GameKeyboard from '../components/GameKeyboard';
import Help from '../components/Help';
import Healthbar from '../components/Healthbar';
import HelpModal from '../components/HelpModal';
import BaseModal from '../components/BaseModal';
import LoseModal from '../components/LoseModal';
import WinModal from '../components/WinModal';

import useGameState from '../hooks/useGameState';

import { GameModals, GameStatus } from '../types/Words';

import { MODALS } from '../constants/gameConstants';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [state, actions] = useGameState();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [gameModal, setGameModal] = useState<GameModals>(GameModals.help);

  const modaltitle: string = MODALS[gameModal].title;

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOpenHowtoPlay = () => {
    setGameModal(GameModals.help);
    setModalOpen(true);
  };

  useEffect(() => {
    if (state.status === GameStatus.lose) {
      setGameModal(GameModals.lose);
      setModalOpen(true);
    }
    if (state.status === GameStatus.win) {
      setGameModal(GameModals.win);
      setModalOpen(true);
    }
  }, [state.status]);

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col h-screen justify-between">
      <Head>
        <title>Tebak Kata Silang | hendrasadewa</title>
        <meta name="description" content="Game tebak kata silang" />
      </Head>

      <BaseModal isOpen={isModalOpen} onClose={closeModal} title={modaltitle}>
        {gameModal === GameModals.help && <HelpModal onClose={closeModal} />}
        {gameModal === GameModals.lose && <LoseModal onClose={closeModal} />}
        {gameModal === GameModals.win && <WinModal onClose={closeModal} />}
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
