import React from 'react'

import { crud } from '../../../redux/actions/recints'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'

class RecintsTable extends React.Component {
    componentWillMount() {
        this.props.fetch()
    }

    render() {
        const { recints, onItemClick } = this.props
        return(
            <div>
                <EntityTable 
                    schema={schema}
                    items={recints} 
                    onItemClick={onItemClick}
                    full 
                />
            </div>
        )
    }
}

export default connect(
    ( store ) => {
        return {
            recints: store.recints.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(RecintsTable)