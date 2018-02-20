import React from 'react'

import Table from '../ui/table/Table'

import { create } from '../../redux/actions/windows'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class EntityTable extends React.Component {
    itemClicked( item ) {
        const { formTitle, Form } = this.props
        if( !Form ) {
            return
        }

        this.props.create( formTitle, (<div> <Form initialvalues={item} /> </div>)  )
    }

    render() {
        const { schema, items, full } = this.props

        return(
            <Table
                fields={schema}
                items={items}
                onItemClick={(item) => this.itemClicked( item )}
                full
            />
        )
    }
}
export default connect(
    () => { return {} },
    dispatch => {
        return {
            create: bindActionCreators( create, dispatch )
        }
    }
)(EntityTable)