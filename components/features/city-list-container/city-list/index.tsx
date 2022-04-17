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
                <City {...city} />
            ))}
        </List>
    )
}
