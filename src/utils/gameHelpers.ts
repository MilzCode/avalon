import type { Player } from '@/types/game';
import { TEAM_DISTRIBUTION, CARDS } from '@/types/game';

export const validateRoles = (players: Player[]) => {
  let isValid = true;
  const errors: string[] = [];

  const distribution = TEAM_DISTRIBUTION[players.length as keyof typeof TEAM_DISTRIBUTION];
  const totalGood = players.filter((p) => CARDS[p.role].team === 'good').length;
  const totalEvil = players.filter((p) => CARDS[p.role].team === 'evil').length;
  const totalMerlin = players.filter((p) => p.role === 'merlin').length;
  const totalAssassin = players.filter((p) => p.role === 'assassin').length;

  if (totalGood !== distribution.good || totalEvil !== distribution.evil) {
    isValid = false;
    errors.push(`Alguien se equivocó al seleccionar. Debería haber ${distribution.good} buenos y ${distribution.evil} malos. Actualmente hay ${totalGood} buenos y ${totalEvil} malos.`);
  }
  if (totalMerlin !== 1) {
    isValid = false;
    errors.push('Alguien seleccionó a Merlín por error.');
  }
  if (totalAssassin !== 1) {
    isValid = false;
    errors.push('Alguien seleccionó al Asesino por error.');
  }

  return { isValid, error: errors.join('\n') };
};

export const getPlayerInformation = (player: Player, allPlayers: Player[]) => {
  const info: string[] = [];
  if (player.role === 'merlin') {
    const evilPlayers = allPlayers.filter((p) => CARDS[p.role].team === 'evil');
    info.push('Los siguientes son malvados:');
    info.push(...evilPlayers.map((p) => p.name));
  } else if (CARDS[player.role].team === 'evil') {
    const otherEvil = allPlayers.filter((p) => p.index !== player.index && CARDS[p.role].team === 'evil');
    if (otherEvil.length > 0) {
      if (player.role === 'assassin') {
        info.push('Puedes ganar si descubres quien es merlin.');
        info.push('Tus compañeros malvados son:');
      } else {
        info.push('Tus compañeros malvados son:');
      }
      info.push(...otherEvil.map((p) => p.name));
    }
  }
  return info;
};