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

  function generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  return (
    <div className="ant-race">
      {loadingAnts ? "loading ants..." : ""}
      <button data-cy="load-ant-data" onClick={loadState}>Load Ants</button>
      <button data-cy="start-calculations" disabled={!antsLoaded}>Start Race</button>
      {
        antsLoaded ? (
          <div>
            <ul>
              {ants.map(ant => <li>
                <div>{ant.name}</div>
                <div data-cy='ant-win-chance-state'>
                  {/* TODO: ant component */}
                </div>
              </li>)}
            </ul>
          </div>
        ) : (
          <p>No ants found, please try again</p>
        )
      }
    </div >
  )
}
