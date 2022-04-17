import React from 'react'
import { Ant, IAntWithCalculationsStarted } from '../ant'
import { List } from '../../../basic'

interface AntListProps {
    data: IAntWithCalculationsStarted[]
}

export const AntList: React.VFC<AntListProps> = (props: AntListProps) => {
    return (
        <List header="Results">
            {props.data.map(ant => <Ant data={ant} />)}
        </List>
    )
}
