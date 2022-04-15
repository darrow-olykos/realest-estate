import React from 'react'
import { Ant, IAnt } from '../ant/ant'

interface AntListProps {
    data: IAnt[]
}

type AntWithWinChanceState = IAnt & {
    winChanceState: WinChanceState
}

export enum WinChanceState {
    NOT_YET_RUN = "Not yet run",
    CALCULATING = "Calculating",
    CALCULATED = "Calculated"
}

export function withWinChanceState(ant: IAnt): AntWithWinChanceState {
    return {
        ...ant,
        winChanceState: WinChanceState.NOT_YET_RUN
    }
}

export const AntList: React.VFC<AntListProps> = (props: AntListProps) => {
    return (
        <ul>
            {props.data.map(ant => <li><Ant {...withWinChanceState(ant)} /></li>)}
        </ul>
    )
}
