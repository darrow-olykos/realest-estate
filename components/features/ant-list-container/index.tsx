import React, { useState } from 'react'
import { IAnt } from './ant'
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
  DEFAULT = 'Default',
  LOADING = 'Loading...',
  SUCCESS = 'Success!',
  ERROR = 'Error fetching data',
}

export const AntListContainer: React.VFC = () => {
  let [state, setState] = useState<State>(State.DEFAULT)
  let [data, setData] = useState<IAnt[]>([])
  let [calculationsStarted, setCalculationsStarted] = useState(false)

  async function fetchData() {
    setState(State.LOADING)
    try {
      const result = await fetchAnts()
      if (result.success && typeof result.data !== 'undefined') {
        setState(State.SUCCESS)
        setData(result.data)
      } else {
        setState(State.ERROR)
      }
    } catch (err) {
      setState(State.ERROR)
    }
  }

  return (
    <div>
      <Button data-cy="load-ant-data" onClick={fetchData}>
        Load Ants
      </Button>
      <Button
        data-cy="start-calculations"
        onClick={() => setCalculationsStarted(true)}
        disabled={state !== State.SUCCESS}
      >
        Start Race
      </Button>
      <div>
        <StateMessage state={state} />
      </div>
      <AntList data={data.map((ant) => ({ ...ant, calculationsStarted }))} />
    </div>
  )
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
