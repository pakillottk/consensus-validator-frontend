import React from 'react'

import { crud } from '../../../redux/actions/scantypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import ScanTypeForm from './ScanTypeForm'
import ScanGroupSelector from '../../forms/Controls/ScanGroupSelector/ScanGroupSelector'
import NewScanTypeButton from './NewScanTypeButton'

class ScanTypesTable extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            groupId: 0
        }
    }

    componentWillUpdate( nextProps, nextState ) {
        const oldGroupId = this.state.groupId
        const { groupId } = nextState
        if( oldGroupId !== groupId ) {
            this.props.fetch( '?group=' + groupId )
        }
    }

    render() {
        const { groupId } = this.state
        const { scantypes } = this.props
        return(
            <div>
                <ScanGroupSelector onChange={( e ) => { this.setState( { groupId: e.target.value } ) }}/>
                <NewScanTypeButton disabled={groupId <= 0} groupId={this.state.groupId} />
                <EntityTable
                    schema={schema}
                    items={scantypes}
                    hidden={{type_id: true, group_id: true}}
                    formTitle="EDITAR TIPO ESCANEABLE"
                    Form={ScanTypeForm}
                    full
                />
            </div>
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            scantypes: store.scantypes.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(ScanTypesTable)