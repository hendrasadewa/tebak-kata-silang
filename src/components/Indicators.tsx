import { GameStatus } from '../types/Words';
import classNames from './Indicators.module.css';

interface Props {
  chances: number;
  status: GameStatus;
}

function Indicators({ chances, status }: Props) {
  if (status === GameStatus.win) {
    return <div className={classNames.container}>Anda berhasil</div>;
  }

  if (status === GameStatus.lose) {
    return <div className={classNames.container}>Anda kalah</div>;
  }

  return (
    <div className={classNames.container}>
      {[...Array(chances).fill('💚')].map((life, index) => (
        <span key={`life-${index + 1}`}>{life}</span>
      ))}
    </div>
  );
}

export default Indicators;
