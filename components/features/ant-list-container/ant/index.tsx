import React, { useEffect, useState } from 'react'
import { List, Space } from '../../../basic'
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
        <List.Item
            description={props.data.color + ' ' + props.data.weight + ' ' + props.data.length}
            extra={<Space><span>{winChance?.value}</span>
                <span data-cy="ant-win-chance-state">{winChanceState}</span></Space>
            }>
            {props.data.name}
        </List.Item>
    )
}
