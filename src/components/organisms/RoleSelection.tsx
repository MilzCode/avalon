import { useState, useEffect, useCallback } from 'react';
import type { Player, Role } from '@/types/game';
import { CARDS } from '@/types/game';
import { HoldButton } from '@/components/atoms/HoldButton';
import { Card } from '@/components/atoms/Card';
import { Modal } from '@/components/molecules/Modal';
import { Button } from '@/components/atoms/Button';

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

  if (!isReady) {
    return (
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
        <div className="mx-auto p-6 max-w-lg text-center">
          <h2 className="font-bold text-2xl text-amber-500">
            {player.name.toUpperCase()}, prepárate para seleccionar tu rol
            <div className="mt-1 text-gray-400 text-sm">
              ({currentPlayerNumber} de {totalPlayers} jugadores listos)
            </div>
          </h2>
          <p className="mb-6 text-gray-300">Mantén presionado durante 3 segundos para continuar</p>
          <HoldButton onHoldStart={handleTouchStart} onHoldEnd={handleTouchEnd} progress={progress} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 font-bold text-2xl text-amber-500 text-center">
        {player.name.toUpperCase()}, selecciona la carta que te tocó
        <div className="mt-1 text-gray-400 text-sm">
          ({currentPlayerNumber} de {totalPlayers} jugadores listos)
        </div>
      </h2>
      <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
        {Object.entries(CARDS).map(([role, card]) => (
          <Card key={role} image={card.image} name={card.name} team={card.team} onClick={() => handleRoleClick(role as Role)} />
        ))}
      </div>

      {showConfirmation && selectedRole && (
        <Modal
          title="Confirmar Selección"
          onClose={() => setShowConfirmation(false)}
          actions={
            <>
              <Button variant="primary" onClick={handleConfirm}>
                Confirmar
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
            </>
          }
        >
          <div className="flex justify-center mb-4">
            <img src={CARDS[selectedRole].image} alt={CARDS[selectedRole].name} className="shadow-lg rounded-lg w-32" />
          </div>
          <p className="text-center text-white">
            ¿Estás seguro que quieres ser <span className="text-amber-500">{CARDS[selectedRole].name}</span>?
          </p>
        </Modal>
      )}

      {showNextPlayerPrompt && nextPlayer && (
        <Modal
          title="Siguiente Jugador"
          actions={
            <Button variant="primary" onClick={() => setShowNextPlayerPrompt(false)}>
              Entendido
            </Button>
          }
        >
          <p className="text-center">
            Pásale el dispositivo a <span className="text-amber-500">{nextPlayer.name}</span>
          </p>
        </Modal>
      )}
    </div>
  );
};
