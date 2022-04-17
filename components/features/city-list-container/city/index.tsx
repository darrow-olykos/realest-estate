import React, { useEffect, useState } from 'react'
import { List } from '../../../basic'

export interface CityProps {
    name: String,
    computeStarted: boolean
    compute: () => Promise<number>
}

export enum ComputeState {
    NOT_STARTED = "Not Started",
    IN_PROGRESS = "In progress",
    FINISHED = "Calculated"
}

export const City: React.VFC<CityProps> = (props) => {
    const [computeState, setComputeState] = useState<ComputeState>(ComputeState.NOT_STARTED)
    const [computeResult, setComputeResult] = useState<number>()

    useEffect(() => {
        if (props.computeStarted === true) {
            setComputeState(ComputeState.IN_PROGRESS)
            props.compute().then(result => {
                setComputeState(ComputeState.FINISHED)
                setComputeResult(result)
            })
        }
    }, [props.computeStarted])

    return (
        <List.Item key={'' + props.name} description={computeState} extra={computeResult}>{props.name}</List.Item>
    )
}
