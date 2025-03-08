import { GameInformation } from '@/components/molecules/GameInformation';
import type { Player } from '@/types/game';

interface GameInformationTemplateProps {
  player: Player;
  isInfoVisible: boolean;
  progress: number;
  onHoldStart: () => void;
  onHoldEnd: () => void;
  onContinue: () => void;
  onFinish: () => void;
  isLastPlayer: boolean;
  playerInformation: string[];
}

export const GameInformationTemplate = ({ player, isInfoVisible, progress, onHoldStart, onHoldEnd, onContinue, onFinish, isLastPlayer, playerInformation }: GameInformationTemplateProps) => {
  return (
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
    />
  );
};
