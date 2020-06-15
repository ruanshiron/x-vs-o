export const UserModel = {
  email: '',
  displayName: '',
  photoURL: null,
  points: 0,
  rank: 0,
  wins: 0,
  losses: 0,
  elo: 0,
  blocked: false
}

export const MatchModel = {
  ready: false, 
  users: [],
  turn: 0,
  winner: -1,
}