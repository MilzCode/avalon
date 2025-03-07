import { useState, useEffect, useCallback } from 'react';
import type { Player, Role } from '@/types/game';
import { CARDS } from '@/types/game';
import { HoldButton } from '@/components/atoms/HoldButton';

interface Props {
  player: Player;
  onRoleSelected: (role: Role) => void;
  nextPlayer: Player | null;
  currentPlayerNumber: number;
  totalPlayers: number;
}

export const RoleSelection = ({ player, onRoleSelected, nextPlayer, currentPlayerNumber, totalPlayers }: Props) => {
  const [holdStartTime, setHoldStartTime] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNextPlayerPrompt, setShowNextPlayerPrompt] = useState(false);

  const handleTouchStart = useCallback(() => {
    setHoldStartTime(Date.now());
  }, []);

  const handleTouchEnd = useCallback(() => {
    setHoldStartTime(null);
    setProgress(0);
  }, []);

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (selectedRole) {
      onRoleSelected(selectedRole);
      setShowConfirmation(false);
      setShowNextPlayerPrompt(true);
      setSelectedRole(null);
      setIsReady(false); // Reset isReady for next player
    }
  };

  const handleCancel = () => {
    setSelectedRole(null);
    setShowConfirmation(false);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (holdStartTime) {
      intervalId = setInterval(() => {
        const holdDuration = Date.now() - holdStartTime;
        const newProgress = Math.min((holdDuration / 3000) * 100, 100);
        setProgress(newProgress);

        if (holdDuration >= 1000 && holdDuration < 1100) {
          navigator.vibrate?.(100);
        } else if (holdDuration >= 2000 && holdDuration < 2100) {
          navigator.vibrate?.(100);
        } else if (holdDuration >= 3000) {
          navigator.vibrate?.(200);
          setIsReady(true);
          setShowNextPlayerPrompt(false); // Reset next player prompt
          setHoldStartTime(null);
          setProgress(0);
        }
      }, 16);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [holdStartTime]);

  if (showNextPlayerPrompt && nextPlayer) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-slate-900/95 p-4">
        <div className="space-y-6 w-full max-w-md text-center">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl text-amber-500">
              Entrega el celular a
              <div className="mt-1 text-gray-400 text-sm">
                ({currentPlayerNumber} de {totalPlayers} jugadores listos)
              </div>
            </h2>
            <p className="font-bold text-4xl text-white">{nextPlayer.name}</p>
          </div>

          <HoldButton onHoldStart={handleTouchStart} onHoldEnd={handleTouchEnd} progress={progress} />

          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Mantén presionado durante 3 segundos para continuar</p>
            <p className="text-gray-500 text-xs">{Math.floor(progress / 33) + 1}/3 segundos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-slate-900 p-4">
        <div className="space-y-6 text-center">
          <h2 className="font-bold text-2xl text-amber-500">
            {player.name}, prepárate para seleccionar tu rol
            <div className="mt-1 text-gray-400 text-sm">
              ({currentPlayerNumber} de {totalPlayers} jugadores listos)
            </div>
          </h2>
          <p className="text-gray-300">Mantén presionado durante 3 segundos para continuar</p>
          <HoldButton onHoldStart={handleTouchStart} onHoldEnd={handleTouchEnd} progress={progress} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 p-4 overflow-y-auto">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 font-bold text-2xl text-amber-500 text-center">
          {player.name}, selecciona la carta que te tocó
          <div className="mt-1 text-gray-400 text-sm">
            ({currentPlayerNumber} de {totalPlayers} jugadores listos)
          </div>
        </h2>
        <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
          {Object.entries(CARDS).map(([role, card]) => (
            <button
              key={role}
              onClick={() => handleRoleClick(role as Role)}
              className="flex flex-col items-center bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transform transition-all hover:scale-105"
            >
              <div className="relative mb-3 w-full aspect-[2/3]">
                <img src={card.image} alt={card.name} className="shadow-lg rounded-lg w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-amber-500 text-lg">{card.name}</span>
              <span className="text-gray-400 text-sm">{card.team === 'good' ? 'Bien' : 'Mal'}</span>
            </button>
          ))}
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && selectedRole && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/70 p-4">
            <div className="bg-slate-800 p-6 rounded-lg w-full max-w-sm">
              <h3 className="mb-4 font-bold text-amber-500 text-xl">Confirmar Selección</h3>
              <div className="flex justify-center items-center mb-4">
                <img src={CARDS[selectedRole].image} alt={CARDS[selectedRole].name} className="shadow-lg rounded-lg w-32" />
              </div>
              <p className="mb-6 text-center">
                ¿Confirmas que tu rol es <span className="font-bold text-amber-500">{CARDS[selectedRole].name}</span>?
              </p>
              <div className="flex gap-3">
                <button onClick={handleCancel} className="flex-1 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded">
                  Cancelar
                </button>
                <button onClick={handleConfirm} className="flex-1 bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
