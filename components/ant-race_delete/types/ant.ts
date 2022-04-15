export type Ant = {
  name: String
  length: number
  color: string
  weight: number
}

type AntWithWinChanceState = Ant & {
  winChanceState: WinChanceState
}

export enum WinChanceState {
  NOT_YET_RUN = "Not yet run",
  CALCULATING = "Calculating",
  CALCULATED = "Calculated"
}

export function withWinChanceState(ant: Ant): AntWithWinChanceState {
  return {
    ...ant,
    winChanceState: WinChanceState.NOT_YET_RUN
  }
}

export type AntList = Ant[]
export type AntWithWinChanceStateList = AntWithWinChanceState[]