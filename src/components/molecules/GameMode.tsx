import { Button } from '@/components/atoms/Button';

interface Props {
  onModeSelect: () => void;
  onBack: () => void;
}

export const GameMode = ({ onModeSelect, onBack }: Props) => (
  <div className="mx-auto max-w-2xl">
    <Button variant="secondary" onClick={onBack} className="mb-6">
      ← Volver
    </Button>

    <div className="bg-slate-800/90 shadow-xl backdrop-blur-sm p-6 rounded-lg">
      <h2 className="mb-4 font-bold text-2xl text-amber-500">Selecciona el modo de juego</h2>
      <p className="mb-6 text-gray-300">Elige el modo de juego que prefieres para esta partida</p>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <Button variant="secondary" onClick={onModeSelect} className="p-6 text-left">
          <h3 className="mb-2 font-bold text-amber-500 text-xl">Modo Simple</h3>
          <p className="text-gray-300 text-sm">Solo roles básicos: Merlin, Asesino, Leales y Esbirros</p>
        </Button>

        <div className="relative bg-slate-700/50 p-6 rounded-lg text-left cursor-not-allowed overflow-hidden group">
          <div className="absolute inset-0 flex justify-center items-center bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-bold text-amber-500">Próximamente</span>
          </div>
          <h3 className="mb-2 font-bold text-amber-500/50 text-xl">Modo Avanzado</h3>
          <p className="text-gray-400 text-sm">Incluye roles opcionales: Percival, Morgana, Mordred y Oberón</p>
        </div>
      </div>
    </div>
  </div>
);
