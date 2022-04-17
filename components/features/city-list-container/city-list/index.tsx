import React from 'react'
import { List } from '../../../basic'
import { City, CityProps } from '../city'

interface CityListProps {
    data: CityProps[]
}

export const CityList: React.VFC<CityListProps> = (props) => {
    const { data } = props
    return (
        <List>
            {data.map(city => (
                <City
                    name={city.name}
                    computeStarted={city.computeStarted}
                    compute={city.compute}
                />
            ))}
        </List>
    )
}
