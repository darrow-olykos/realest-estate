import React from 'react'
import { Ant, IAnt, IAntWithCalculationsStarted } from '../ant/ant'

interface AntListProps {
    data: IAntWithCalculationsStarted[]
}

export const AntList: React.VFC<AntListProps> = (props: AntListProps) => {
    return (
        <ul>
            {props.data.map(ant => <li><Ant data={ant} /></li>)}
        </ul>
    )
}
