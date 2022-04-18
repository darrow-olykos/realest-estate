import React, { useState } from 'react'
import { DotLoading } from '../feedback'
import { Button } from '../basic'

import { get } from '../containers/utils/fetch'

enum State {
    DEFAULT = 'Default',
    LOADING = 'Loading...',
    SUCCESS = 'Success!',
    ERROR = 'Error fetching data',
}

export function createComputeContainer<T>() {
    interface ComputeContainerProps {
        url: string
        entityName: string
        overrideId: string
        componentToRender: React.JSXElementConstructor<{ data: T[] }> // TODO: Make implicit coupling to { data: T[] } explit by taking in ThingListProps instead
        computeForEach: (item: T) => Promise<number>
    }
    const ComputeContainer: React.VFC<ComputeContainerProps> = (props) => {
        let [state, setState] = useState<State>(State.DEFAULT)
        let [data, setData] = useState<T[]>([])
        let [calculationsStarted, setCalculationsStarted] = useState(false)

        async function fetchData() {
            setCalculationsStarted(false)
            setState(State.LOADING)
            try {
                const result = await get<T>(props.url)
                if (result.success && typeof result.data !== 'undefined') {
                    setState(State.SUCCESS)
                    setData(result.data)
                } else {
                    console.error(result)
                    setState(State.ERROR)
                }
            } catch (err) {
                console.error(err)
                setState(State.ERROR)
            }
        }

        function startCalculations() {
            setCalculationsStarted(true)
        }

        return (
            <div>
                <Button data-cy={`load-${props.entityName}-data`} onClick={fetchData}>
                    Load data
                </Button>
                <Button
                    data-cy="start-calculations"
                    onClick={startCalculations}
                    disabled={state !== State.SUCCESS}
                >
                    Calculate
                </Button>
                <div>
                    <StateMessage state={state} />
                </div>
                {/* 
                    TODO: Design a friendlier way to compose calculationStarted onto the entity props 
                    A user should be able to use ComputeContainer without needing to read implementation to figure out where this property comes from.
                */}
                <props.componentToRender
                    data={data.map((item) => ({
                        ...item,
                        computeStarted: calculationsStarted,
                        compute: props.computeForEach,
                        id: item[props.overrideId]
                    }))}
                />
            </div>
        )
    }

    return ComputeContainer
}

const StateMessage = (props) => {
    switch (props.state) {
        case State.DEFAULT:
            return <span>Click above to do something.</span>
            break
        case State.LOADING:
            return <DotLoading />
            break
        case State.ERROR:
            return <span>Something went wrong</span>
            break
        case State.SUCCESS:
            return <span></span>
            break
        default:
            return <span>StateMessage component error</span>
    }
}
