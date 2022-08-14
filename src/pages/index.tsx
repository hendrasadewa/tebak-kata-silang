import type { NextPage } from 'next';
import Head from 'next/head';

import GameModalsController from '../components/GameModalsController';
import GameTemplate from '../components/GameTemplate';
import Header from '../components/Header';
import Footer from '../components/Footer';

import useGameState from '../hooks/useGameState';

import { GameModals } from '../types/Words';

import useModalState from '../hooks/useModalState';

const Home: NextPage = () => {
  const [gameState, gameActions] = useGameState();
  const [modalState, modalActions] = useModalState(gameState.result);

  const handleOpenHowtoPlay = () => {
    modalActions.openModal(GameModals.help);
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col h-screen justify-between">
      <Head>
        <title>Tebak Kata Silang | hendrasadewa</title>
        <meta name="description" content="Game tebak kata silang" />
      </Head>
      <Header />
      {gameState.userAnswer ? (
        <GameTemplate
          incorrectAnswerChances={gameState.chances}
          keyboard={gameState.keyboard}
          onGameKeyboardClick={gameActions.handleUserAnswer}
          onHowtoPlayClick={handleOpenHowtoPlay}
          userAnswer={gameState.userAnswer}
        />
      ) : (
        <div>loading</div>
      )}
      <Footer />
      <GameModalsController
        isOpen={modalState.isModalOpen}
        modalType={modalState.modalType}
        onClose={modalActions.closeModal}
        title={modalState.modalTitle}
      />
    </div>
  );
};

export default Home;
