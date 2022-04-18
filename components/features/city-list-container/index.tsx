import React from 'react'
import { createComputeContainer } from '../../utils/create-compute-container'
import { CityList } from './city-list'
import { CityProps } from './city'
import { Card } from '../../display'

export const CityListContainer: React.VFC = () => {
    let CityComputeContainer = createComputeContainer<CityProps>()
    return (
        <Card
            bodyStyle={{
                border: "1px solid var(--border-color)",
                padding: "10px",
            }}
            title="Realest Estate"
        >
            <CityComputeContainer
                entityName="city"
                url="/api/cities"
                componentToRender={CityList}
                computeForEach={async (item) => {
                    const result = await generatePriority()
                    return result
                }}
            />
        </Card>
    )
}

function generatePriority(): Promise<number> {
    return new Promise((resolve, reject) => {
        const delay = 2000 + Math.random() * 2000
        const priority = Math.random() * 100
        setTimeout(() => {
            resolve(priority)
        }, delay)
    })
}
