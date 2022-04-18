import React, { useEffect, useState } from 'react'
import { List } from '../../../basic'

export interface CityProps {
    id: string
    name: string
    computeStarted: boolean
    compute: () => Promise<number>
    emitComputeResult: (id, result) => void
}

export enum ComputeState {
    NOT_STARTED = 'Not Started',
    IN_PROGRESS = 'In progress',
    FINISHED = 'Calculated',
}

export const City: React.VFC<CityProps> = (props) => {
    let { id, compute, emitComputeResult, computeStarted } = props
    const [computeState, setComputeState] = useState<ComputeState>(
        ComputeState.NOT_STARTED,
    )
    const [computeResult, setComputeResult] = useState<number>()

    useEffect(() => {
        if (computeStarted === true) {
            setComputeState(ComputeState.IN_PROGRESS)
            compute().then((result) => {
                setComputeState(ComputeState.FINISHED)
                setComputeResult(result)
                emitComputeResult(id, result)
            })
        }
    }, [computeStarted])

    return (
        <List.Item description={computeState} extra={computeResult}>
            {props.name}
        </List.Item>
    )
}
