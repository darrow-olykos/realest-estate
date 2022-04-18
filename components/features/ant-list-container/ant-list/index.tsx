import React, { useEffect, useState } from 'react'
import { Flipper, Flipped } from "react-flip-toolkit";
import { List } from '../../../basic'
import { Ant, AntProps } from '../ant'

import {
  createPriorityQueue,
  PriorityQueue,
} from '../../../utils/create-priority-queue'

interface AntListProps {
  data: AntProps[]
}

export const AntList: React.VFC<AntListProps> = (props) => {
  let { data } = props
  const [ants, setAnts] = useState<AntProps[]>(data)
  const [computedResults, setComputedResults] = useState<PriorityQueue<string>>(createPriorityQueue<string>())

  useEffect(() => {
    setAnts(data)
  }, [data])

  useEffect(() => {
    if (data.length > 0 && computedResults.getData().length === data.length) {
      let cityPropListMap = buildMap(data)
      let sortedData = computedResults.getData().map(([id, _priority]) => cityPropListMap.get(id)!)
      setAnts(sortedData)
    }
  }, [computedResults])


  const handleComputeResult = (id, result) => {
    const newQueue = createPriorityQueue<string>();
    setComputedResults(prevQueue => {
      prevQueue.getData().forEach(pair => newQueue.insert(pair[0], pair[1]))
      newQueue.insert(id, result);
      return newQueue;
    })
  }

  return (
    <Flipper flipKey={ants.map(ant => ant.id).join("")}>
      <List>
        {ants.map((ant) => (
          <Flipped key={ant.id} flipId={ant.id}>
            <div><Ant {...ant} emitComputeResult={handleComputeResult} /></div>
          </Flipped>
        ))}
      </List>
    </Flipper>

  )
}

function buildMap(antPropsList: AntProps[]) {
  let antPropsListMap: Map<string, AntProps> = new Map<string, AntProps>()
  for (let i = 0; i < antPropsList.length; i++) {
    let antProps = antPropsList[i]
    antPropsListMap.set(antProps.id, antProps)
  }
  return antPropsListMap
}
