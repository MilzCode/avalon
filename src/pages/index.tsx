import { useState, useEffect } from 'react';
import { RoleSelection } from '@/components/organisms/RoleSelection';
import { HoldButton } from '@/components/atoms/HoldButton';
import type { Player, Role } from '@/types/game';
import { TEAM_DISTRIBUTION, CARDS } from '@/types/game';

type GamePhase = 'menu' | 'setup' | 'gameMode' | 'roleSelection' | 'reveal' | 'information';

const Index = () => {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [holdStartTime, setHoldStartTime] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const handleStartGame = () => {
    setPhase('setup');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setError(null);
  };

  const validateRoles = (players: Player[]) => {
    const distribution = TEAM_DISTRIBUTION[players.length as keyof typeof TEAM_DISTRIBUTION];
    if (!distribution) return false;

    const roles = players.map((p) => p.role);
    const goodCount = roles.filter((role) => CARDS[role].team === 'good').length;
    const evilCount = roles.filter((role) => CARDS[role].team === 'evil').length;

    const hasMerlin = roles.includes('merlin');
    const hasAssassin = roles.includes('assassin');

    return goodCount === distribution.good && evilCount === distribution.evil && hasMerlin && hasAssassin;
  };

  const handleRoleSelected = (role: Role) => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].role = role;
    setPlayers(updatedPlayers);

    if (currentPlayerIndex < players.length - 1) {
      // Don't move to next player yet, RoleSelection component will handle the transition
      const nextPlayerIndex = currentPlayerIndex + 1;
      setCurrentPlayerIndex(nextPlayerIndex);
    } else {
      if (validateRoles(updatedPlayers)) {
        setPhase('information');
        setCurrentPlayerIndex(0);
      } else {
        setError('Los roles seleccionados no cumplen con las reglas del juego. Por favor, inténtalo de nuevo.');
        setCurrentPlayerIndex(0);
        setPlayers(players.map((p) => ({ ...p, role: 'loyal' as Role })));
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
    setPhase('gameMode');
  };

  const handleGameModeSelected = () => {
    setPhase('roleSelection');
  };

  const getPlayerInformation = (player: Player, allPlayers: Player[]) => {
    const info = [];
    if (player.role === 'merlin') {
      const evilPlayers = allPlayers.filter((p) => CARDS[p.role].team === 'evil');
      info.push('Puedes ver a los siguientes jugadores como malvados:');
      info.push(...evilPlayers.map((p) => p.name));
    } else if (CARDS[player.role].team === 'evil') {
      const otherEvil = allPlayers.filter((p) => p.index !== player.index && CARDS[p.role].team === 'evil');
      if (otherEvil.length > 0) {
        info.push('Tus compañeros malvados son:');
        info.push(...otherEvil.map((p) => p.name));
      }
    }
    return info;
  };

  const handleHoldStart = () => {
    setHoldStartTime(Date.now());
    setError(null);
    setIsInfoVisible(true);
    navigator.vibrate?.(100);
  };

  const handleHoldEnd = () => {
    setHoldStartTime(null);
    setIsInfoVisible(false);

    // Only advance if held for at least 3 seconds
    if (holdStartTime && Date.now() - holdStartTime >= 3000) {
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
        navigator.vibrate?.(200);
      } else {
        setPhase('reveal');
        navigator.vibrate?.([200, 100, 200]);
      }
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
    <div className="bg-slate-900 min-h-screen text-gray-100">
      <div className="mx-auto px-4 py-8 container">
        <h1 className="mb-8 font-bold text-4xl text-amber-500 text-center">Avalon</h1>

        {error && <div className="bg-red-500/20 mb-6 p-4 border border-red-500 rounded-lg text-center">{error}</div>}

        {phase === 'menu' && (
          <div className="flex flex-col items-center space-y-6">
            <p className="max-w-2xl text-center text-gray-300 text-lg">Prepara tu partida de Avalon y minimiza los errores durante la fase de preparación</p>
            <button onClick={handleStartGame} className="bg-amber-600 hover:bg-amber-700 px-8 py-4 rounded-lg font-bold text-xl transform transition-colors duration-200 hover:scale-105">
              Iniciar Juego
            </button>
          </div>
        )}

        {phase === 'setup' && <PlayerSetup onBack={() => setPhase('menu')} onConfirm={handlePlayersConfirmed} />}

        {phase === 'gameMode' && (
          <div className="mx-auto max-w-2xl">
            <button onClick={() => setPhase('setup')} className="mb-6 text-amber-500 hover:text-amber-400">
              ← Volver
            </button>

            <div className="bg-slate-800 shadow-xl p-6 rounded-lg">
              <h2 className="mb-4 font-bold text-2xl text-amber-500">Selecciona el modo de juego</h2>
              <p className="mb-6 text-gray-300">Elige el modo de juego que prefieres para esta partida</p>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <button onClick={handleGameModeSelected} className="bg-slate-700 hover:bg-slate-600 p-6 rounded-lg text-left transition-colors">
                  <h3 className="mb-2 font-bold text-amber-500 text-xl">Modo Simple</h3>
                  <p className="text-gray-300 text-sm">Solo roles básicos: Merlin, Asesino, Leales y Esbirros</p>
                </button>

                <button disabled className="relative bg-slate-700/50 p-6 rounded-lg text-left cursor-not-allowed overflow-hidden group">
                  <div className="absolute inset-0 flex justify-center items-center bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-bold text-amber-500">Próximamente</span>
                  </div>
                  <h3 className="mb-2 font-bold text-amber-500/50 text-xl">Modo Avanzado</h3>
                  <p className="text-gray-400 text-sm">Incluye roles opcionales: Percival, Morgana, Mordred y Oberón</p>
                </button>
              </div>
            </div>
          </div>
        )}

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
          <div className="bg-slate-800 shadow-xl mx-auto p-6 rounded-lg max-w-2xl">
            <h2 className="mb-6 font-bold text-2xl text-amber-500 text-center">
              {players[currentPlayerIndex].name}, revisa tu información
              <div className="mt-1 text-gray-400 text-sm">
                ({currentPlayerIndex + 1} de {players.length} jugadores)
              </div>
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-700 p-6 rounded-lg">
                {isInfoVisible ? (
                  <>
                    <p className="mb-4 font-bold text-xl">
                      Tu rol es: <span className="text-amber-500">{CARDS[players[currentPlayerIndex].role].name}</span>
                    </p>
                    <p className="mb-2 text-gray-400">
                      Perteneces al equipo del <span className="font-bold">{CARDS[players[currentPlayerIndex].role].team === 'good' ? 'Bien' : 'Mal'}</span>
                    </p>
                    {getPlayerInformation(players[currentPlayerIndex], players).map((info, i) => (
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
                <HoldButton onHoldStart={handleHoldStart} onHoldEnd={handleHoldEnd} progress={progress} />
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Mantén presionado durante 3 segundos para {currentPlayerIndex < players.length - 1 ? 'pasar al siguiente jugador' : 'finalizar'}</p>
                  <p className="text-gray-500 text-xs">{Math.floor(progress / 33) + 1}/3 segundos...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {phase === 'reveal' && (
          <div className="bg-slate-800 shadow-xl mx-auto p-6 rounded-lg max-w-2xl">
            <h2 className="mb-4 font-bold text-2xl text-amber-500">¡El juego puede comenzar!</h2>
            <p className="mb-6 text-gray-300">Todos los jugadores han visto su información. ¡Que gane el mejor equipo!</p>
            <button onClick={() => setPhase('menu')} className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg">
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface PlayerSetupProps {
  onBack: () => void;
  onConfirm: (players: string[]) => void;
}

const PlayerSetup = ({ onBack, onConfirm }: PlayerSetupProps) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState('');

  const addPlayer = () => {
    if (newPlayer.trim() && players.length < 10) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <button onClick={onBack} className="mb-6 text-amber-500 hover:text-amber-400">
        ← Volver
      </button>

      <div className="bg-slate-800 shadow-xl p-6 rounded-lg">
        <h2 className="mb-4 font-bold text-2xl text-amber-500">Ingresa los jugadores</h2>
        <p className="mb-4 text-gray-400 text-sm">Mínimo 5 jugadores, máximo 10. Ingresa los nombres en el orden en que están sentados (izquierda a derecha)</p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Nombre del jugador"
            className="flex-1 bg-slate-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
          />
          <button onClick={addPlayer} disabled={players.length >= 10} className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 px-4 py-2 rounded disabled:cursor-not-allowed">
            Agregar
          </button>
        </div>

        <ul className="space-y-2">
          {players.map((player, index) => (
            <li key={index} className="flex justify-between items-center bg-slate-700 px-4 py-2 rounded">
              <span>
                {index + 1}. {player}
              </span>
              <button onClick={() => removePlayer(index)} className="text-red-400 hover:text-red-300">
                ✕
              </button>
            </li>
          ))}
        </ul>

        {players.length > 0 && (
          <div className="mt-6 text-center">
            <button onClick={() => onConfirm(players)} disabled={players.length < 5} className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 px-6 py-3 rounded-lg disabled:cursor-not-allowed">
              Continuar ({players.length}/5-10 jugadores)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
