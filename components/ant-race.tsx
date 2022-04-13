import React, { useEffect, useState } from 'react'
import { AntList } from './types/ant-list'

export const AntRace = () => {
  const [ants, setAnts] = useState<AntList>([])
  const [antsLoaded, setAntsLoaded] = useState(false)

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

  useEffect(() => {
    ; (async () => {
      setAntsLoaded(false)
      let res = await fetchAnts()
      if (res.success) {
        setAnts(res.data.results)
        setAntsLoaded(true)
      }
    })()
  }, [])

  return (
    <div className="ant-race">
      <button data-cy="load-ant-data">Load ants</button>
      {antsLoaded ? (
        <div>
          <ul>
            <li>{JSON.stringify(ants)}</li>
          </ul>
        </div>
      ) : (
        <p>No ants found, please try again</p>
      )}
    </div>
  )
}
