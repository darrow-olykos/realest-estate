import React, { useEffect, useState } from 'react'
import { AntList } from './types/ant-list'

export const AntRace = () => {
  const [ants, setAnts] = useState<AntList>([])
  const [antsLoaded, setAntsLoaded] = useState(false)
  const [loadingAnts, setLoadingAnts] = useState(false)

  const fetchAnts = async () => {
    try {
      let response = await fetch('/api/ants')
      let json = await response.json()
      return { success: true, data: json }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }

  const loadState = async () => {
    setLoadingAnts(true);
    setAntsLoaded(false)
    let res = await fetchAnts()
    if (res.success) {
      setAnts(res.data)
      setAntsLoaded(true)
    }
  }

  return (
    <div className="ant-race">
      {loadingAnts ? "loading ants..." : ""}
      <button data-cy="load-ant-data" onClick={loadState}>Load Ants</button>
      <button data-cy="start-calculations" onClick={loadState}>Start Race</button>
      {antsLoaded ? (
        <div>
          <ul>
            {ants.map(ant => <li>{ant.name}</li>)}
          </ul>
        </div>
      ) : (
        <p>No ants found, please try again</p>
      )}
    </div>
  )
}
