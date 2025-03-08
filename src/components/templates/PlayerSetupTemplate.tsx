import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { PlayerList } from '@/components/molecules/PlayerList';

const STORAGE_KEY = 'avalon-players';

interface PlayerSetupTemplateProps {
  onBack: () => void;
  onConfirm: (players: string[]) => void;
}

export const PlayerSetupTemplate = ({ onBack, onConfirm }: PlayerSetupTemplateProps) => {
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
