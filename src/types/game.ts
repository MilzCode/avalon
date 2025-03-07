export type Role = 'merlin' | 'assassin' | 'loyal' | 'minion';
export type GameMode = 'simple' | 'advanced';

export interface Player {
  name: string;
  role: Role;
  index: number;
}

export const TEAM_DISTRIBUTION = {
  5: { good: 3, evil: 2 },
  6: { good: 4, evil: 2 },
  7: { good: 4, evil: 3 },
  8: { good: 5, evil: 3 },
  9: { good: 6, evil: 3 },
  10: { good: 6, evil: 4 },
} as const;

// For simple mode
export const CARDS = {
  merlin: { name: 'Merlin', image: '/cards/merlin.png', team: 'good' },
  assassin: { name: 'Asesino', image: '/cards/assassin.png', team: 'evil' },
  loyal: { name: 'Leal', image: '/cards/loyal1.png', team: 'good' },
  minion: { name: 'Esbirro', image: '/cards/minion1.png', team: 'evil' },
} as const;

// Will be used in advanced mode later
export const OPTIONAL_CARDS = {
  percival: { name: 'Percival', image: '/cards/percival.png', team: 'good' },
  morgana: { name: 'Morgana', image: '/cards/morgana.png', team: 'evil' },
  mordred: { name: 'Mordred', image: '/cards/mordred.png', team: 'evil' },
  oberon: { name: 'Oberon', image: '/cards/oberon.png', team: 'evil' },
} as const;