import { Answer, GameKeyboardState } from '../types/Words';
import GameKeyboard from './GameKeyboard';
import Healthbar from './Healthbar';
import Help from './Help';
import Plane from './Plane';

interface Props {
  incorrectAnswerChances: number;
  userAnswer: Answer;
  keyboard: Array<GameKeyboardState>;
  onHowtoPlayClick: () => void;
  onGameKeyboardClick: (letter: string) => void;
}

function GameTemplate({
  incorrectAnswerChances,
  userAnswer,
  keyboard,
  onHowtoPlayClick,
  onGameKeyboardClick,
}: Props) {
  return (
    <main className="px-4 mx-auto max-w-lg w-full pt-2 pb-4 h-full flex flex-col justify-between">
      <div className="flex justify-between items-center w-full">
        <Help onClick={onHowtoPlayClick} />
        <Healthbar chances={incorrectAnswerChances} />
      </div>
      <div className="py-2 flex items-center justify-center w-full">
        <Plane values={userAnswer} />
      </div>
      <div>
        <GameKeyboard
          characterList={keyboard}
          onCharacterClick={onGameKeyboardClick}
        />
      </div>
    </main>
  );
}

export default GameTemplate;
