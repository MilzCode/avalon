import type { Player, GameMode } from '@/types/game';
import { TEAM_DISTRIBUTION, CARDS, OPTIONAL_CARDS } from '@/types/game';

export const validateRoles = (players: Player[], gameMode: GameMode) => {
  let isValid = true;
  const errors: string[] = [];

  const distribution = TEAM_DISTRIBUTION[players.length as keyof typeof TEAM_DISTRIBUTION];
  const allCards = gameMode === 'advanced' ? { ...CARDS, ...OPTIONAL_CARDS } : CARDS;
  
  const totalGood = players.filter((p) => allCards[p.role].team === 'good').length;
  const totalEvil = players.filter((p) => allCards[p.role].team === 'evil').length;
  const totalMerlin = players.filter((p) => p.role === 'merlin').length;
  const totalAssassin = players.filter((p) => p.role === 'assassin').length;

  // Validaciones básicas
  if (totalGood !== distribution.good || totalEvil !== distribution.evil) {
    isValid = false;
    errors.push(`Alguien se equivocó al seleccionar. Debería haber ${distribution.good} buenos y ${distribution.evil} malos. Actualmente hay ${totalGood} buenos y ${totalEvil} malos.`);
  }
  if (totalMerlin !== 1) {
    isValid = false;
    errors.push('Debe haber exactamente un Merlín en el juego.');
  }
  if (totalAssassin !== 1) {
    isValid = false;
    errors.push('Debe haber exactamente un Asesino en el juego.');
  }

  // Validaciones del modo avanzado
  if (gameMode === 'advanced') {
    // Validar Percival y Morgana (deben estar juntos o ninguno)
    const hasPercival = players.some((p) => p.role === 'percival');
    const hasMorgana = players.some((p) => p.role === 'morgana');
    if (hasPercival !== hasMorgana) {
      isValid = false;
      errors.push('Percival y Morgana deben estar juntos en el juego o ninguno de los dos.');
    }

    // Validar roles especiales según número de jugadores
    const hasOberon = players.some((p) => p.role === 'oberon');
    const hasMordred = players.some((p) => p.role === 'mordred');
    
    // Con 5 jugadores, solo permitir un rol especial malvado
    if (players.length === 5) {
      const specialEvilCount = Number(hasMorgana) + Number(hasMordred) + Number(hasOberon);
      if (specialEvilCount > 1) {
        isValid = false;
        errors.push('Con 5 jugadores, solo puede haber un personaje especial malvado (Morgana o Mordred).');
      }
      // Oberon no está permitido con 5 jugadores
      if (hasOberon) {
        isValid = false;
        errors.push('Oberón no está permitido en partidas de 5 jugadores.');
      }
    }
  }

  return { isValid, error: errors.join('\n') };
};

export const getPlayerInformation = (player: Player, allPlayers: Player[], gameMode: GameMode) => {
  const info: string[] = [];
  const allCards = gameMode === 'advanced' ? { ...CARDS, ...OPTIONAL_CARDS } : CARDS;
  const card = allCards[player.role];

  if (player.role === 'merlin') {
    const evilPlayers = allPlayers.filter((p) => 
      allCards[p.role].team === 'evil' && p.role !== 'mordred'
    );
    info.push('Los siguientes son malvados:');
    info.push(...evilPlayers.map((p) => p.name));
  } else if (card.team === 'evil' && player.role !== 'oberon') {
    const otherEvil = allPlayers.filter(
      (p) => p.index !== player.index && 
      allCards[p.role].team === 'evil' && 
      p.role !== 'oberon'
    );
    if (otherEvil.length > 0) {
      if (player.role === 'assassin') {
        info.push('Puedes ganar si descubres quien es merlin.');
        info.push('Tus compañeros malvados son:');
      } else {
        info.push('Tus compañeros malvados son:');
      }
      info.push(...otherEvil.map((p) => p.name));
    }
  } else if (player.role === 'percival') {
    const merlinMorgana = allPlayers.filter(
      (p) => p.role === 'merlin' || p.role === 'morgana'
    );
    info.push('Estos jugadores podrían ser Merlín (uno es Morgana):');
    info.push(...merlinMorgana.map((p) => p.name));
  }
  
  return info;
};