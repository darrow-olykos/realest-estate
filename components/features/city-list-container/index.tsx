import React from 'react'
import { createComputeContainer } from '../../containers/compute'
import { CityList } from './city-list'
import { CityProps } from './city'

export const CityListContainer: React.VFC = () => {
    let CityComputeContainer = createComputeContainer<CityProps>();
    return (
        <CityComputeContainer
            entityName="city"
            url="/api/cities"
            render={(items) => {
                return {
                    component: CityList,
                    props: {
                        data: items
                    }
                }
            }}
            compute={async (item) => {
                const result = await generatePriority();
                return result;
            }}
        />
    )
}

function generatePriority(): Promise<number> {
    return new Promise((resolve, reject) => {
        const delay = 5000 + Math.random() * 5000;
        const priority = Math.random();
        setTimeout(() => {
            resolve(priority)
        }, delay)
    })
}
