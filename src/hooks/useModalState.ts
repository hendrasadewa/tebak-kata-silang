import { useEffect, useState } from 'react';
import { MODALS } from '../constants/gameConstants';
import { GameModals, GameResult } from '../types/Words';

interface State {
  isModalOpen: boolean;
  modalType: GameModals;
  modalTitle: string;
}

interface Actions {
  openModal: (modalType: GameModals) => void;
  closeModal: () => void;
}

type ReturnType = [State, Actions];

function useModalState(gameResult: GameResult): ReturnType {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<GameModals>(GameModals.help);

  const modalTitle: string = MODALS[modalType].title;

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (modalType: GameModals) => {
    setModalType(modalType);
    setModalOpen(true);
  };

  useEffect(() => {
    if (gameResult === GameResult.noresult) {
      return;
    }
    if (gameResult === GameResult.lose) {
      openModal(GameModals.lose);
    } else if (gameResult === GameResult.win) {
      openModal(GameModals.win);
    }
  }, [gameResult]);

  const mapStateToHooks: State = {
    isModalOpen,
    modalType,
    modalTitle,
  };

  const mapActionToHooks: Actions = {
    closeModal,
    openModal,
  };

  return [mapStateToHooks, mapActionToHooks];
}

export default useModalState;
