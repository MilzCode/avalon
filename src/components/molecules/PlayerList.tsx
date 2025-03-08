interface Props {
  players: string[];
  onRemovePlayer: (index: number) => void;
  minPlayers?: number;
  maxPlayers?: number;
}

export const PlayerList = ({ players, onRemovePlayer, minPlayers = 5, maxPlayers = 10 }: Props) => (
  <div>
    {players.length > 0 && (
      <ul className="space-y-2">
        {players.map((player, index) => (
          <li key={index} className="flex justify-between items-center bg-slate-700 px-4 py-2 rounded">
            <span>
              {index + 1}. {player}
            </span>
            <button onClick={() => onRemovePlayer(index)} className="text-red-400 hover:text-red-300">
              ✕
            </button>
          </li>
        ))}
      </ul>
    )}

    {players.length > 0 && (
      <div className="mt-6 text-center">
        <span className="text-gray-400">
          {players.length} de {minPlayers}-{maxPlayers} jugadores
        </span>
      </div>
    )}
  </div>
);
