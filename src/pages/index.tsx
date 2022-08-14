import type { NextPage } from 'next';
import Head from 'next/head';

import GameModalsController from '../components/GameModalsController';
import GameTemplate from '../components/GameTemplate';
import Header from '../components/Header';
import Footer from '../components/Footer';

import useGameState from '../hooks/useGameState';

import { Answer, GameModals } from '../types/Words';

import useModalState from '../hooks/useModalState';
import { mockAnswer } from '../__mocks__/useGameState.mock';
import { ALPHABET_ARRAY } from '../constants/gameConstants';

export async function getStaticProps() {
  return {
    // temporary
    props: { answer: mockAnswer, keyboardLayout: ALPHABET_ARRAY },
  };
}

interface Props {
  answer: Answer;
  keyboardLayout: string;
}

const Home: NextPage<Props> = ({ answer, keyboardLayout }) => {
  const [gameState, gameActions] = useGameState(answer, keyboardLayout);
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
        <main className="px-4 mx-auto max-w-lg w-full pt-2 pb-4 h-full flex flex-col items-center justify-between">
          <div>loading ...</div>
        </main>
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
