import { HoldButton } from '@/components/atoms/HoldButton';
import { Button } from '@/components/atoms/Button';
import type { Player, GameMode } from '@/types/game';
import { CARDS, OPTIONAL_CARDS } from '@/types/game';

interface Props {
  player: Player;
  isInfoVisible: boolean;
  progress: number;
  onHoldStart: () => void;
  onHoldEnd: () => void;
  onContinue: () => void;
  onFinish?: () => void;
  isLastPlayer?: boolean;
  playerInformation: (string | JSX.Element)[];
  gameMode: GameMode;
}

export const GameInformation = ({ player, isInfoVisible, progress, onHoldStart, onHoldEnd, onContinue, onFinish, isLastPlayer, playerInformation, gameMode }: Props) => {
  const allCards = gameMode === 'advanced' ? { ...CARDS, ...OPTIONAL_CARDS } : CARDS;
  const card = allCards[player.role];

  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="bg-slate-800/90 shadow-xl backdrop-blur-sm mb-6 p-6 rounded-lg">
        <h2 className="mb-4 font-bold text-2xl text-amber-500">{player.name.toUpperCase()}</h2>
        <div className="relative mb-6">
          <div className="bg-slate-900/90 mb-5 p-6 rounded-lg text-white">
            {isInfoVisible ? (
              <>
                <p className="mb-4 text-lg">
                  Tu rol es: <span className="text-amber-500">{card.name}</span>
                </p>
                <p className="mb-4 text-gray-400">
                  Perteneces al equipo del <span className="font-bold">{card.team === 'good' ? 'Bien' : 'Mal'}</span>
                </p>
                <p className="mb-4 text-gray-300">{card.desc}</p>
                {playerInformation.map((info, i) =>
                  typeof info === 'string' ? (
                    <p key={i} className="mt-2 text-gray-300">
                      {info}
                    </p>
                  ) : (
                    <div key={i} className="mt-2 text-gray-300">
                      {info}
                    </div>
                  )
                )}
              </>
            ) : (
              <p className="text-center text-gray-400">Mantén presionado para revelar tu información</p>
            )}
          </div>

          <div className="space-y-4 text-center">
            {!isInfoVisible ? (
              <HoldButton onHoldStart={onHoldStart} onHoldEnd={onHoldEnd} progress={progress} />
            ) : (
              <Button onClick={isLastPlayer ? onFinish : onContinue} className="mt-6">
                {isLastPlayer ? 'Continuar' : 'Continuar'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
