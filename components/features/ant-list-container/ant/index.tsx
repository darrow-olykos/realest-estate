import React, { useEffect, useState } from 'react'
import { List } from '../../../basic'

export interface IAnt {
  name: String
  length: number
  color: string
  weight: number
}

export interface AntProps {
  id: string
  name: String
  length: number
  color: string
  weight: number
  computeStarted: boolean
  compute: () => Promise<number>
  emitComputeResult: (id, result) => void
}

export enum ComputeState {
  NOT_STARTED = 'Not yet run',
  IN_PROGRESS = 'In progress',
  FINISHED = 'Calculated',
}

export const Ant: React.VFC<AntProps> = (props) => {
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
    <List.Item description={<span data-cy="ant-win-chance-state">{computeState}</span>} extra={computeResult}>
      {props.name}
    </List.Item>
  )
}
