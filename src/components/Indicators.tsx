import { GameStatus } from '../types/Words';

interface Props {
  status: GameStatus;
}

function Indicators({ status }: Props) {
  if (status === GameStatus.win) {
    return <div>Anda berhasil</div>;
  }

  if (status === GameStatus.lose) {
    return <div>Anda kalah</div>;
  }

  return (
    <div> started
    </div>
  );
}

export default Indicators;
