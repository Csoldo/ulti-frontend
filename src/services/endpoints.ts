// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
    CHANGE_USERNAME: "/auth/change-username",
  },

  // Players
  PLAYER: {
    GET_ALL: "/player",
    GET_BY_ID: (id: number) => `/player/${id}`,
    CREATE: "/player",
  },

  // Bid Types
  BID_TYPE: {
    GET_ALL: "/bidType",
    GET_BY_ID: (id: number) => `/bidType/${id}`,
    GET_BY_NAME: (name: string) => `/bidType/name/${name}`,
  },

  // Bids
  BID: {
    GET_ALL: "/bid",
    GET_BY_ID: (id: number) => `/bid/${id}`,
  },

  // Rounds
  ROUND: {
    GET_ALL: "/round",
    GET_BY_ID: (id: number) => `/round/${id}`,
    CREATE: "/round",
  },

  // Silent Bids
  SILENT_BID: {
    GET_ALL: "/silent-bid",
    GET_BY_ID: (id: number) => `/silent-bid/${id}`,
  },

  // Games
  GAME: {
    GET_ALL: "/game",
    GET_ACTIVE: "/game/active",
    CREATE: "/game",
    FINISH: "/game/finish",
  },

  // Utility
  PING: "/ping",
} as const;
