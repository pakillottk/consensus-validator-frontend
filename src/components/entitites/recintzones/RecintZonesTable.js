import React from 'react'

import { crud } from '../../../redux/actions/recintzones'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import RecintZoneForm from './RecintZoneForm'
import EntityTable from '../EntityTable'

class RecintZonesTable extends React.Component {
    componentWillMount() {
        this.props.fetch('?recint='+this.props.recintId)
    }

    render() {
        const { recintzones, onItemClick } = this.props
        return(
            <div>
                <EntityTable 
                    schema={schema}
                    items={recintzones} 
                    hidden={{recint_id: true}}
                    onItemClick={onItemClick}
                    formTitle="EDITAR ZONA"
                    Form={RecintZoneForm}
                    full 
                />
            </div>
        )
    }
}

export default connect(
    ( store ) => {
        return {
            recintzones: store.recintzones.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(RecintZonesTable)