import { GameModals } from '../types/Words';

import BaseModal from './BaseModal';
import HelpModal from './HelpModal';
import LoseModal from './LoseModal';
import WinModal from './WinModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  modalType: GameModals;
}

function GameModalsController({ isOpen, onClose, title, modalType }: Props) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      {modalType === GameModals.help && <HelpModal onClose={onClose} />}
      {modalType === GameModals.lose && <LoseModal onClose={onClose} />}
      {modalType === GameModals.win && <WinModal onClose={onClose} />}
    </BaseModal>
  );
}

export default GameModalsController;
