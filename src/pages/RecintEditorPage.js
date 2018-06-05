import React from 'react'

import Segment from '../components/ui/segment/Segment'
import RecintForm from '../components/entitites/recints/RecintForm'
import NewRecintZoneButton from '../components/entitites/recintzones/NewRecintZoneButton'
import RecintZonesTable from '../components/entitites/recintzones/RecintZonesTable'
import { crud } from '../redux/actions/recints'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class RecintEditorPage extends React.Component {
    componentWillMount() {
        this.props.fetch( this.props.match.params.id )
    }

    render() {
        const { recint } = this.props
        const recintId = parseInt( this.props.match.params.id, 10 );
        if( !recint ) {
            return(
                <div>
                    <Segment secondary>
                        <h1>EL RECINTO NO EXISTE O NO ESTÁ AUTORIZADO</h1>
                    </Segment>
                </div>
            )
        }
        return(
            <div>
                <RecintForm id={ recintId }/>
                <Segment secondary styles={{padding: 0, textAlign:'center'}}>
                    <h1>ZONAS</h1>
                </Segment>
                <Segment styles={{padding:0}}>
                    <NewRecintZoneButton recintId={ recintId }/>
                    <RecintZonesTable recintId={ recintId }/>
                </Segment>
            </div> 
        )
    }
}
export default connect(
    ( store, props ) => {
        return {
            recint: store.recints.data.get( parseInt( props.match.params.id, 10 ) )
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetchById, dispatch )
        }
    }
)(RecintEditorPage)