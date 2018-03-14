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
                { Object.keys( selected ).length > 0 && <CodesActions codes={selected} /> }
                <Segment secondary> <h3 style={{textAlign:'center'}}>TOTAL CÓDIGOS: { codes.size }</h3> </Segment>
                <EntityTable 
                    scrollable
                    multiselect
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
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(CompaniesTable)