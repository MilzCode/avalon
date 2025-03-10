export type Role = "merlin" | "assassin" | "loyal" | "minion" | "percival" | "morgana" | "mordred" | "oberon";
export type GameMode = "simple" | "advanced";

export interface Player {
  name: string;
  role: Role;
  index: number;
}

interface Card {
  id: string;
  name: string;
  image: string;
  team: "good" | "evil";
  desc: string;
  knows: string[];
  balance?: number;
  needs?: string[];
}

interface CardsObject {
  [key: string]: Card;
}

export const TEAM_DISTRIBUTION = {
  5: { good: 3, evil: 2 },
  6: { good: 4, evil: 2 },
  7: { good: 4, evil: 3 },
  8: { good: 5, evil: 3 },
  9: { good: 6, evil: 3 },
  10: { good: 6, evil: 4 },
} as const;

// 🎲 Modo simple (sin personajes opcionales)
export const CARDS: CardsObject = {
  merlin: {
    id: "merlin",
    name: "Merlín",
    image: "/cards/merlin.png",
    team: "good",
    desc: "Conoce a los malvados. Si es descubierto por el Asesino, los buenos pierden.",
    knows: ["assassin", "morgana", "minion"], // ✅ NO ve a Mordred ni a Oberon
  },
  assassin: {
    id: "assassin",
    name: "Asesino",
    image: "/cards/assassin.png",
    team: "evil",
    desc: "Conoce a los malvados. Si descubre a Merlín al final de la partida, los malvados ganan.",
    knows: ["minion", "morgana"], // ✅ NO ve a Mordred ni a Oberon
  },
  loyal: {
    id: "loyal",
    name: "Leal (Loyal)",
    image: "/cards/loyals.png",
    team: "good",
    desc: "Del bando del Bien.",
    knows: [],
  },
  minion: {
    id: "minion",
    name: "Esbirro (Minion)",
    image: "/cards/minions.png",
    team: "evil",
    desc: "Conoce a los demás malvados.",
    knows: ["assassin", "morgana"], // ✅ NO ve a Mordred ni a Oberon
  },
} as const;

// 🎭 Modo avanzado (con personajes opcionales)
export const OPTIONAL_CARDS: CardsObject = {
  percival: {
    id: "percival",
    name: "Percival",
    image: "/cards/percival.png",
    team: "good",
    desc: "Ve a Merlín (Bien) y Morgana (Mal), pero no sabe cuál es cuál.",
    balance: +1,
    knows: ["merlin", "morgana"], // ✅ Percival ve dos personas pero no sabe quién es quién
    needs: ["morgana"] // ✅ Percival solo tiene sentido si Morgana está en juego
  },
  morgana: {
    id: "morgana",
    name: "Morgana",
    image: "/cards/morgana.png",
    team: "evil",
    desc: "Conoce a los malvados. Se hace pasar por Merlín (Bien) ante Percival (Bien).",
    balance: 0,
    knows: ["assassin", "minion", "mordred"], // ✅ NO ve a Oberon
    needs: ["percival"] // ✅ Morgana solo tiene sentido si Percival está en juego
  },
  mordred: {
    id: "mordred",
    name: "Mordred",
    image: "/cards/mordred.png",
    team: "evil",
    desc: "Conoce a los malvados. Merlín (Bien) no puede verlo como malvado.",
    balance: -1,
    knows: ["assassin", "morgana", "minion"], // ✅ NO ve a Oberon, Merlín NO lo ve a él

  },
  oberon: {
    id: "oberon",
    name: "Oberon",
    image: "/cards/oberon.png",
    team: "evil",
    desc: "Es un malvado, pero no conoce a los demás ni ellos a él.",
    balance: +1,
    knows: [], // ✅ Nadie lo ve, y él no ve a nadie

  },
} as const;
