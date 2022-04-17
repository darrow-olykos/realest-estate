import React, { useState } from 'react'
import { Ant, IAnt, WinChanceState } from './ant/ant'
import { AntList } from './ant-list'
import { Button } from '../../basic'
import { DotLoading } from '../../feedback'

interface Result<T> {
    success: boolean
    data?: T[]
}

const fetchAnts = async (): Promise<Result<IAnt>> => {
    try {
        let response = await fetch('/api/ants')
        let json = await response.json()
        return { success: true, data: json }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

enum State {
    LOADING = "Loading...",
    SUCCESS = "Success!",
    ERROR = "Error fetching data"
}

export const AntListContainer: React.VFC = () => {
    let [state, setState] = useState<State>(State.LOADING)
    let [data, setData] = useState<IAnt[]>([])
    let [calculationsStarted, setCalculationsStarted] = useState(false);

    async function fetchData() {
        setState(State.LOADING)
        try {
            const result = await fetchAnts();
            if (result.success && typeof result.data !== 'undefined') {
                setState(State.SUCCESS)
                setData(result.data)
            }
            else {
                setState(State.ERROR)
            }
        }
        catch (err) {
            setState(State.ERROR)
        }
    }

    return (
        <div>
            <Button data-cy="load-ant-data" onClick={fetchData}>Load Ants</Button>
            <Button data-cy="start-calculations" onClick={() => setCalculationsStarted(true)} disabled={state !== State.SUCCESS}>Start Race</Button>
            <div>{state === State.LOADING ? <DotLoading /> : ''}</div>
            <AntList data={data.map(ant => ({ ...ant, calculationsStarted }))} />
        </div>
    )
}
