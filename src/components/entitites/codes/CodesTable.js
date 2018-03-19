import React from 'react'

import { crud } from '../../../redux/actions/codes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import CodesActions from './CodesActions'
import Segment from '../../ui/segment/Segment';

class CompaniesTable extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            selected: {}
        }
    }
    componentWillMount() {
        this.props.fetch('?session=' + this.props.sessionId)
    }

    handleSelection( codes ) {
        this.setState({selected: codes})
    }

    render() {
        const { selected } = this.state
        const { codes } = this.props
        return(
            <div style={{position:'relative'}}>
                <CodesActions codes={selected} onDeselect={() => this.handleSelection({})}/>
                <Segment secondary> <h3 style={{textAlign:'center'}}>TOTAL CÓDIGOS: { codes.size }</h3> </Segment>
                <EntityTable 
                    scrollable
                    multiselect
                    selected={selected}
                    onSelection={this.handleSelection.bind(this)}
                    hidden={{type_id: true}}
                    schema={schema} 
                    items={codes} 
                    full 
                />
            </div>
        )
    }
}

export default connect(
    ( store ) => {
        return {
            codes: store.codes.data
            .sort((a, b) => {
                if( a.type_id < b.type_id ) { return -1; }
                if( a.type_id > b.type_id ) { return 1; }
                if( a.type_id === b.type_id ) { return 0; }
            })
            .sort((a,b) =>{
                if( a.updated_at < b.updated_at ) { return 1; }
                if( a.updated_at > b.updated_at ) { return -1; }
                if( a.updated_at === b.updated_at ) { return 0; }
            })
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(CompaniesTable)