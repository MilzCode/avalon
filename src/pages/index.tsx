import { useState, useEffect } from 'react';
import { MainMenu } from '@/components/templates/MainMenu';
import { PlayerSetupTemplate } from '@/components/templates/PlayerSetupTemplate';
import { RoleSelectionTemplate } from '@/components/templates/RoleSelectionTemplate';
import { GameInformationTemplate } from '@/components/templates/GameInformationTemplate';
import { GameMode } from '@/components/molecules/GameMode';
import type { Player, Role } from '@/types/game';
import { validateRoles, getPlayerInformation } from '@/utils/gameHelpers';

type GamePhase = 'menu' | 'setup' | 'gameMode' | 'roleSelection' | 'reveal' | 'information';

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
      setCurrentPlayerIndex(currentPlayerIndex + 1);
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
    setPhase('gameMode');
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
          {phase === 'menu' && <MainMenu onStartGame={handleStartGame} onViewRules={handleViewRules} />}

          {phase === 'setup' && <PlayerSetupTemplate onBack={() => setPhase('menu')} onConfirm={handlePlayersConfirmed} />}

          {phase === 'gameMode' && <GameMode onModeSelect={() => setPhase('roleSelection')} onBack={() => setPhase('setup')} />}

          {phase === 'roleSelection' && players[currentPlayerIndex] && (
            <RoleSelectionTemplate
              currentPlayer={players[currentPlayerIndex]}
              nextPlayer={currentPlayerIndex < players.length - 1 ? players[currentPlayerIndex + 1] : null}
              currentPlayerNumber={currentPlayerIndex + 1}
              totalPlayers={players.length}
              showErrorModal={showErrorModal}
              error={error}
              onRoleSelected={handleRoleSelected}
              onCloseErrorModal={() => setShowErrorModal(false)}
            />
          )}

          {phase === 'information' && players[currentPlayerIndex] && (
            <GameInformationTemplate
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
        </div>
      </div>
    </div>
  );
};

export default Index;
