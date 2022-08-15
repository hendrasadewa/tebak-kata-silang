import { GameModals } from '../types/Words';

import BaseModal from './BaseModal';
import HelpModal from './HelpModal';
import LoseModal from './LoseModal';
import WinModal from './WinModal';

interface Props {
  isOpen: boolean;
  title: string;
  modalType: GameModals;
  startTime?: Date;
  stopTime?: Date;
  chances: number;
  onClose: () => void;
}

function GameModalsController({
  isOpen,
  onClose,
  title,
  modalType,
  startTime,
  stopTime,
  chances
}: Props) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      {modalType === GameModals.help && <HelpModal onClose={onClose} />}
      {modalType === GameModals.lose && <LoseModal onClose={onClose} />}
      {modalType === GameModals.win && (
        <WinModal onClose={onClose} startTime={startTime} stopTime={stopTime} chances={chances} />
      )}
    </BaseModal>
  );
}

export default GameModalsController;
