import { HoldButton } from '@/components/atoms/HoldButton';
import { Button } from '@/components/atoms/Button';
import type { Player } from '@/types/game';
import { CARDS } from '@/types/game';

interface Props {
  player: Player;
  isInfoVisible: boolean;
  progress: number;
  onHoldStart: () => void;
  onHoldEnd: () => void;
  onContinue: () => void;
  onFinish?: () => void;
  isLastPlayer?: boolean;
  playerInformation: string[];
}

export const GameInformation = ({ player, isInfoVisible, progress, onHoldStart, onHoldEnd, onContinue, onFinish, isLastPlayer, playerInformation }: Props) => (
  <div className="mx-auto max-w-lg text-center">
    <div className="bg-slate-800/90 shadow-xl backdrop-blur-sm mb-6 p-6 rounded-lg">
      <h2 className="mb-4 font-bold text-2xl text-amber-500">{player.name.toUpperCase()}</h2>
      <div className="relative mb-6">
        <div className="bg-slate-900/90 mb-5 p-6 rounded-lg text-white">
          {isInfoVisible ? (
            <>
              <p className="mb-4 text-lg">
                Tu rol es: <span className="text-amber-500">{CARDS[player.role].name}</span>
              </p>
              <p className="mb-2 text-gray-400">
                Perteneces al equipo del <span className="font-bold">{CARDS[player.role].team === 'good' ? 'Bien' : 'Mal'}</span>
              </p>
              {playerInformation.map((info, i) => (
                <p key={i} className="mt-2 text-gray-300">
                  {info}
                </p>
              ))}
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
              {isLastPlayer ? 'Volver al inicio' : 'Continuar'}
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
);
