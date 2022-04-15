import React, { useEffect, useState } from 'react'
import { generateAntWinLikelihoodCalculator } from './generate-ant-win-likelihood-calculator'
import { createPercent, Percent } from './percent'

export interface IAnt {
    name: String
    length: number
    color: string
    weight: number
}

export type IAntWithCalculationsStarted = IAnt & {
    calculationsStarted: boolean
}

export enum WinChanceState {
    NOT_YET_RUN = "Not yet run",
    CALCULATING = "In progress",
    CALCULATED = "Calculated"
}

export type AntProps = {
    data: IAntWithCalculationsStarted
}

export const Ant: React.VFC<AntProps> = (props) => {
    const [winChanceState, setWinChanceState] = useState<WinChanceState>(WinChanceState.NOT_YET_RUN)
    const [winChance, setWinChance] = useState<Percent>()

    useEffect(() => {
        if (props.data.calculationsStarted === true) {
            setWinChanceState(WinChanceState.CALCULATING)
            generateAntWinLikelihoodCalculator()(chance => {
                setWinChance(createPercent(chance))
                setWinChanceState(WinChanceState.CALCULATED)
            })
        }
    }, [props.data.calculationsStarted])

    return (
        <div className="ant">
            <span>{props.data.name}</span>
            <span>{props.data.weight}</span>
            <span>{props.data.color}</span>
            <span>{props.data.length}</span>
            <span>{winChance?.value}</span>
            <span data-cy="ant-win-chance-state">{winChanceState}</span>
        </div>
    )
}
