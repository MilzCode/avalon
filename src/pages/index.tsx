import { useState, useEffect } from 'react';
import { RoleSelection } from '@/components/organisms/RoleSelection';
import { Button } from '@/components/atoms/Button';
import { PlayerList } from '@/components/molecules/PlayerList';
import { GameMode } from '@/components/molecules/GameMode';
import { GameInformation } from '@/components/molecules/GameInformation';
import { Modal } from '@/components/molecules/Modal';
import type { Player, Role } from '@/types/game';
import { validateRoles, getPlayerInformation } from '@/utils/gameHelpers';
import packageJson from '../../package.json';

type GamePhase = 'menu' | 'setup' | 'gameMode' | 'roleSelection' | 'reveal' | 'information';

const STORAGE_KEY = 'avalon-players';

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [holdStartTime, setHoldStartTime] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleStartGame = () => {
    setPhase('setup');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setError(null);
  };

  const handleViewRules = () => {
    window.open('/Reglas.pdf', '_blank');
  };

  const handleRoleSelected = (role: Role) => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].role = role;
    setPlayers(updatedPlayers);

    if (currentPlayerIndex < players.length - 1) {
      const nextPlayerIndex = currentPlayerIndex + 1;
      setCurrentPlayerIndex(nextPlayerIndex);
    } else {
      const validation = validateRoles(updatedPlayers);
      if (validation.isValid) {
        setPhase('information');
        setCurrentPlayerIndex(0);
      } else {
        setError(validation.error);
        setCurrentPlayerIndex(0);
        setPlayers(players.map((p) => ({ ...p, role: 'loyal' as Role })));
        setShowErrorModal(true);
      }
    }
  };

  const handlePlayersConfirmed = (confirmedPlayers: string[]) => {
    const initialPlayers = confirmedPlayers.map((name, index) => ({
      name,
      role: 'loyal' as Role,
      index,
    }));
    setPlayers(initialPlayers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(confirmedPlayers));
    setPhase('gameMode');
  };

  const handleGameModeSelected = () => {
    setPhase('roleSelection');
  };

  const handleHoldStart = () => {
    setHoldStartTime(Date.now());
    setError(null);
    navigator.vibrate?.(100);
  };

  const handleHoldEnd = () => {
    setHoldStartTime(null);
    if (holdStartTime && Date.now() - holdStartTime >= 3000) {
      setIsInfoVisible(true);
      navigator.vibrate?.(200);
    } else {
      setIsInfoVisible(false);
      setProgress(0);
    }
  };

  const handleContinue = () => {
    setIsInfoVisible(false);
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setPhase('reveal');
      navigator.vibrate?.([200, 100, 200]);
    }
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
        }
      }, 16);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [holdStartTime]);

  return (
    <div className="bg-[url('/background.png')] bg-slate-900 bg-cover bg-center bg-fixed min-h-screen">
      <div className="bg-black/50 backdrop-blur-sm px-4 py-8 min-h-screen">
        <div className="relative mx-auto max-w-4xl">
          {phase === 'menu' ? (
            <div className="flex flex-col items-center space-y-8">
              <div className="mb-4 w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64">
                <img src="/coverlogo.jpg" alt="Avalon Logo" className="shadow-2xl rounded-lg w-full h-full object-contain" />
              </div>
              <h1 className="font-bold text-4xl text-amber-500 text-center">The Resistance: Avalon</h1>
              <p className="max-w-2xl text-center text-gray-300 text-lg">Prepara tu partida de Avalon y minimiza los errores durante la fase de preparación</p>
              <div className="space-y-4">
                <Button onClick={handleStartGame} className="px-8 py-4 w-full text-xl">
                  Iniciar Juego
                </Button>
                <Button onClick={handleViewRules} variant="secondary" className="px-8 py-4 w-full text-xl">
                  Ver Reglas
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <h1 className="drop-shadow-lg mb-8 font-bold text-4xl text-amber-500 text-center">The Resistance: Avalon</h1>

              {phase === 'setup' && (
                <div className="relative">
                  <PlayerSetup onBack={() => setPhase('menu')} onConfirm={handlePlayersConfirmed} />
                </div>
              )}

              {phase === 'gameMode' && <GameMode onModeSelect={handleGameModeSelected} onBack={() => setPhase('setup')} />}

              {phase === 'roleSelection' && players[currentPlayerIndex] && (
                <RoleSelection
                  player={players[currentPlayerIndex]}
                  onRoleSelected={handleRoleSelected}
                  nextPlayer={currentPlayerIndex < players.length - 1 ? players[currentPlayerIndex + 1] : null}
                  currentPlayerNumber={currentPlayerIndex + 1}
                  totalPlayers={players.length}
                />
              )}

              {phase === 'information' && players[currentPlayerIndex] && (
                <GameInformation
                  player={players[currentPlayerIndex]}
                  isInfoVisible={isInfoVisible}
                  progress={progress}
                  onHoldStart={handleHoldStart}
                  onHoldEnd={handleHoldEnd}
                  onContinue={handleContinue}
                  onFinish={() => setPhase('menu')}
                  isLastPlayer={currentPlayerIndex === players.length - 1}
                  playerInformation={getPlayerInformation(players[currentPlayerIndex], players)}
                />
              )}

              {showErrorModal && error && (
                <Modal
                  title="Error en la Selección de Roles"
                  actions={
                    <Button variant="primary" onClick={() => setShowErrorModal(false)}>
                      Entendido
                    </Button>
                  }
                >
                  <div className="text-center">
                    <p className="mb-4 text-white">{error}</p>
                    <p className="text-gray-400">Los roles se han reiniciado. Por favor, revisen sus cartas, vuelvan a seleccionar sus roles correctamente.</p>
                  </div>
                </Modal>
              )}
            </div>
          )}
        </div>
        <p className="mt-3 text-center text-gray-500 text-xs">v{packageJson.version}</p>
      </div>
    </div>
  );
};

interface PlayerSetupProps {
  onBack: () => void;
  onConfirm: (players: string[]) => void;
}

const PlayerSetup = ({ onBack, onConfirm }: PlayerSetupProps) => {
  const [players, setPlayers] = useState<string[]>(() => {
    const savedPlayers = localStorage.getItem(STORAGE_KEY);
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });
  const [newPlayer, setNewPlayer] = useState('');

  const addPlayer = () => {
    if (newPlayer.trim() && players.length < 10) {
      setPlayers([...players, newPlayer.trim().toUpperCase()]);
      setNewPlayer('');
    }
  };

  const clearPlayers = () => {
    setPlayers([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="mx-auto max-w-2xl text-white">
      <Button variant="secondary" onClick={onBack} className="mb-6">
        ← Volver
      </Button>

      <div className="bg-slate-800 shadow-xl p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl text-amber-500">Ingresa los jugadores</h2>
          {players.length > 0 && (
            <Button variant="secondary" onClick={clearPlayers} className="text-sm">
              Limpiar lista
            </Button>
          )}
        </div>
        <p className="mb-4 text-gray-400 text-sm">Mínimo 5 jugadores, máximo 10. Ingresa los nombres en el orden en que están sentados</p>

        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Nombre del jugador"
            className="flex-1 bg-slate-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
          />
          <Button onClick={addPlayer} disabled={players.length >= 10}>
            Agregar
          </Button>
        </div>

        <PlayerList players={players} onRemovePlayer={(index) => setPlayers(players.filter((_, i) => i !== index))} />

        {players.length > 0 && (
          <div className="mt-6 text-center">
            <Button onClick={() => onConfirm(players)} disabled={players.length < 5} className="px-6 py-3">
              Continuar ({players.length}/5-10 jugadores)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
