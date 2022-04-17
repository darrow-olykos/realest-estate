import React, { useEffect, useState } from 'react'
import { DotLoading } from './../feedback'
import { Button } from './../basic'

import { get } from './utils/fetch'

enum State {
    DEFAULT = "Default",
    LOADING = "Loading...",
    SUCCESS = "Success!",
    ERROR = "Error fetching data"
}

export function createComputeContainer<T>() {
    type ComponentConstructorAndArgs = {
        component: React.JSXElementConstructor<{ data: T[] }>,
        props: {
            data: T[]
        }
    }
    interface ComputeContainerProps {
        url: string,
        entityName: string,
        render: (items: T[]) => ComponentConstructorAndArgs,
        compute: (item: T) => Promise<number>
    }
    const ComputeContainer: React.VFC<ComputeContainerProps> = (props) => {
        let [state, setState] = useState<State>(State.DEFAULT)
        let [data, setData] = useState<T[]>([])
        let [calculationsStarted, setCalculationsStarted] = useState(false);

        async function fetchData() {
            setCalculationsStarted(false)
            setState(State.LOADING)
            try {
                const result = await get<T>(props.url);
                if (result.success && typeof result.data !== 'undefined') {
                    setState(State.SUCCESS)
                    setData(result.data)
                }
                else {
                    console.error(result)
                    setState(State.ERROR)
                }
            }
            catch (err) {
                console.error(err)
                setState(State.ERROR)
            }
        }

        const ComponentWithCalculationsStarted: React.VFC<ComponentConstructorAndArgs> = (props) => {
            return <props.component {...props.props} />
        }

        return (
            <div>
                <Button data-cy={`load-${props.entityName}-data`} onClick={fetchData}>Load data</Button>
                <Button data-cy="start-calculations" onClick={() => setCalculationsStarted(true)} disabled={state !== State.SUCCESS}>Calculate</Button>
                <div><StateMessage state={state} /></div>
                {/* 
                    TODO: Design a friendlier way to compose calculationStarted onto the entity props 
                    A user should be able to use ComputeContainer without needing to read implementation to figure out where this property comes from.
                */}
                <ComponentWithCalculationsStarted {...(props.render(
                    data.map(
                        item => ({
                            ...item,
                            computeStarted: calculationsStarted,
                            compute: props.compute
                        })
                    )
                ))} />
            </div>
        )
    }

    return ComputeContainer;
}

const StateMessage = (props) => {
    switch (props.state) {
        case State.DEFAULT: return <span>Click above to do something.</span>; break;
        case State.LOADING: return <DotLoading />; break;
        case State.ERROR: return <span>Something went wrong</span>; break;
        case State.SUCCESS: return <span></span>; break;
        default: return <span>StateMessage component error</span>
    }
}
