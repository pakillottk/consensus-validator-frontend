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

        this.props.create( formTitle, (<div> <Form id={item.id} /> </div>)  )
    }

    hideFields( fields, hidden ) {
        if( !hidden ) {
            return fields
        }

        const visibleFields = []
        fields.forEach( field => {
            if( !hidden[ field.name ] ) {
                visibleFields.push( field )
            }
        });

        return visibleFields
    }

    render() {
        const { schema, multiselect, onSelection, scrollable, items, hidden, full, onItemClick } = this.props

        return(
            <Table
                multiselect={multiselect}
                onSelection={onSelection}
                scrollable={scrollable}
                fields={this.hideFields( schema, hidden )}
                items={items}
                onItemClick={(item) => onItemClick ? onItemClick( item ) : this.itemClicked( item )}
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