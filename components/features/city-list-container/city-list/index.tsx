import React, { useEffect, useState } from 'react'
import { List } from '../../../basic'
import { City, CityProps } from '../city'

import {
    createPriorityQueue,
    PriorityQueue,
} from '../../../utils/create-priority-queue'

interface CityListProps {
    data: CityProps[]
}

export const CityList: React.VFC<CityListProps> = (props) => {
    let { data } = props
    const [cities, setCities] = useState<CityProps[]>(data)
    const [computedResults, setComputedResults] = useState<PriorityQueue<string>>(createPriorityQueue<string>())

    useEffect(() => {
        setCities(data)
    }, [data])

    useEffect(() => {
        if (data.length > 0 && computedResults.getData().length === data.length) {
            let cityPropListMap = buildMap(data)
            let sortedData = computedResults.getData().map(([id, _priority]) => cityPropListMap.get(id)!)
            setCities(sortedData)
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
        <List>
            {cities.map((city) => (
                <City key={'' + city.id} {...city} emitComputeResult={handleComputeResult} />
            ))}
        </List>
    )
}

function buildMap(cityPropList: CityProps[]) {
    let cityPropListMap: Map<string, CityProps> = new Map<string, CityProps>()
    for (let i = 0; i < cityPropList.length; i++) {
        let cityProp = cityPropList[i]
        cityPropListMap.set(cityProp.id, cityProp)
    }
    return cityPropListMap
}
