import { Button } from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import packageJson from '../../../package.json';

interface MainMenuProps {
  onStartGame: () => void;
  onViewRules: () => void;
}

export const MainMenu = ({ onStartGame, onViewRules }: MainMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="mb-4 w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64">
        <img src="/coverlogo.jpg" alt="Avalon Logo" className="shadow-2xl rounded-lg w-full h-full object-contain" />
      </div>
      <h1 className="font-bold text-4xl text-amber-500 text-center">The Resistance: Avalon</h1>
      <p className="max-w-2xl text-center text-gray-300 text-lg">Prepara tu partida de Avalon y minimiza los errores durante la fase de preparación</p>
      <div className="space-y-4">
        <Button onClick={onStartGame} className="px-8 py-4 w-full text-xl">
          Iniciar Juego
        </Button>
        <Button onClick={() => navigate('/about')} variant="secondary" className="px-8 py-4 w-full text-xl">
          Como usar
        </Button>
        <Button onClick={onViewRules} variant="secondary" className="px-8 py-4 w-full text-xl">
          Ver Reglas de Avalon
        </Button>
      </div>
      <p className="mt-3 text-center text-gray-500 text-xs">v{packageJson.version}</p>
    </div>
  );
};
