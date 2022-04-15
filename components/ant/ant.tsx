import React, { useEffect, useState } from 'react'
import { generateAntWinLikelihoodCalculator } from './generate-ant-win-likelihood-calculator'
import { createPercent, Percent } from './percent'

export interface IAnt {
    name: String
    length: number
    color: string
    weight: number
}

interface WithWinChanceState {
    winChanceState: WinChanceState
}

export enum WinChanceState {
    NOT_YET_RUN = "Not yet run",
    CALCULATING = "Calculating",
    CALCULATED = "Calculated"
}

export type AntProps = IAnt & WithWinChanceState;

export const Ant: React.VFC<AntProps> = (props) => {
    const [winChanceState, setWinChanceState] = useState<WinChanceState>(WinChanceState.NOT_YET_RUN)
    const [winChance, setWinChance] = useState<Percent>()

    setWinChanceState(WinChanceState.CALCULATING)
    /*generateAntWinLikelihoodCalculator()(chance => {
        setWinChance(createPercent(chance))
        setWinChanceState(WinChanceState.CALCULATED)
    })*/

    return (
        <div className="ant">
            <span>{props.name}</span>
            <span>{props.weight}</span>
            <span>{props.color}</span>
            <span>{props.length}</span>
            <span data-cy="ant-win-chance-state">{winChanceState}</span>
            <span>{winChance}</span>
        </div>
    )
}
