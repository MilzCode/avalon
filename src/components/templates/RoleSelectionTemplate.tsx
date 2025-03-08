import { RoleSelection } from '@/components/organisms/RoleSelection';
import { Modal } from '@/components/molecules/Modal';
import { Button } from '@/components/atoms/Button';
import type { Player, Role, GameMode } from '@/types/game';

interface RoleSelectionTemplateProps {
  currentPlayer: Player;
  nextPlayer: Player | null;
  currentPlayerNumber: number;
  totalPlayers: number;
  showErrorModal: boolean;
  error: string | null;
  onRoleSelected: (role: Role) => void;
  onCloseErrorModal: () => void;
  gameMode: GameMode;
}

export const RoleSelectionTemplate = ({
  currentPlayer,
  nextPlayer,
  currentPlayerNumber,
  totalPlayers,
  showErrorModal,
  error,
  onRoleSelected,
  onCloseErrorModal,
  gameMode,
}: RoleSelectionTemplateProps) => {
  return (
    <>
      <RoleSelection player={currentPlayer} onRoleSelected={onRoleSelected} nextPlayer={nextPlayer} currentPlayerNumber={currentPlayerNumber} totalPlayers={totalPlayers} gameMode={gameMode} />

      {showErrorModal && error && (
        <Modal
          title="Error en la Selección de Roles"
          actions={
            <Button variant="primary" onClick={onCloseErrorModal}>
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
    </>
  );
};
