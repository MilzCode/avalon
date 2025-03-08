import { GameInformation } from '@/components/molecules/GameInformation';
import type { Player, GameMode } from '@/types/game';

interface Props {
  player: Player;
  isInfoVisible: boolean;
  progress: number;
  onHoldStart: () => void;
  onHoldEnd: () => void;
  onContinue: () => void;
  onFinish?: () => void;
  isLastPlayer?: boolean;
  playerInformation: (string | JSX.Element)[];
  gameMode: GameMode;
}

export const GameInformationTemplate = ({ player, isInfoVisible, progress, onHoldStart, onHoldEnd, onContinue, onFinish, isLastPlayer, playerInformation, gameMode }: Props) => (
  <GameInformation
    player={player}
    isInfoVisible={isInfoVisible}
    progress={progress}
    onHoldStart={onHoldStart}
    onHoldEnd={onHoldEnd}
    onContinue={onContinue}
    onFinish={onFinish}
    isLastPlayer={isLastPlayer}
    playerInformation={playerInformation}
    gameMode={gameMode}
  />
);
