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
  merlin: { name: 'Merlin', image: '/cards/merlin.png', team: 'good', desc: 'Conoce a los malvados. Si es descubierto por el asesino los buenos pierden.' },
  assassin: { name: 'Asesino', image: '/cards/assassin.png', team: 'evil', desc: 'Conoce a los malvados. Si descubre quien es merlin los malos ganan.' },
  loyal: { name: 'Leal', image: '/cards/loyal1.png', team: 'good', desc: 'No tiene habilidades especiales' },
  minion: { name: 'Esbirro', image: '/cards/minion1.png', team: 'evil', desc: 'Conoce a los malvados.' },
} as const;

// Will be used in advanced mode later
export const OPTIONAL_CARDS = {
  percival: {
    name: "Percival",
    image: "/cards/percival.png",
    team: "good",
    description: "Ve a Merlín y Morgana, pero no sabe cuál es cuál.",
    balance: { good: 1, evil: 0 }
  },
  morgana: {
    name: "Morgana",
    image: "/cards/morgana.png",
    team: "evil",
    description: "Conoce a los malvados. Se hace pasar por Merlín ante Percival.",
    balance: { good: 0, evil: 1 }
  },
  mordred: {
    name: "Mordred",
    image: "/cards/mordred.png",
    team: "evil",
    description: "Conoce a los malvados. Merlín no puede verlo como malvado.",
    balance: { good: 0, evil: 1 }
  },
  oberon: {
    name: "Oberon",
    image: "/cards/oberon.png",
    team: "evil",
    description: "Es un malvado, pero no conoce a los demás ni ellos a él.",
    balance: { good: 1, evil: 0 }
  }
} as const;