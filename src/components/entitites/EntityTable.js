import React from 'react'

import Table from '../ui/table/Table'

export default class EntityTable extends React.Component {
    render() {
        const { schema, items, full } = this.props

        return(
            <Table
                fields={schema}
                items={items}
                full
            />
        )
    }
}