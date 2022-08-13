import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import GameModalsController from '../components/GameModalsController';
import GameTemplate from '../components/GameTemplate';

import useGameState from '../hooks/useGameState';

import { GameModals, GameStatus } from '../types/Words';

import { MODALS } from '../constants/gameConstants';

import Header from '../components/Header';
import Footer from '../components/Footer';

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

      <Header />
      <GameTemplate
        incorrectAnswerChances={state.incorrectAnswerChances}
        keyboard={state.keyboard}
        onGameKeyboardClick={actions.onGameKeyboardClick}
        onHowtoPlayClick={handleOpenHowtoPlay}
        userAnswer={state.userAnswer}
      />
      <Footer />
      <GameModalsController
        isOpen={isModalOpen}
        modalType={gameModal}
        onClose={closeModal}
        title={modaltitle}
      />
    </div>
  );
};

export default Home;
