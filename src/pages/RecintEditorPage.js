import React from 'react'

import Segment from '../components/ui/segment/Segment'
import RecintForm from '../components/entitites/recints/RecintForm'
import NewRecintZoneButton from '../components/entitites/recintzones/NewRecintZoneButton'
import RecintZonesTable from '../components/entitites/recintzones/RecintZonesTable'
import { crud } from '../redux/actions/recints'
import { crud as ZoneActions } from '../redux/actions/recintzones'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RecintEditor from '../components/recintEditor/RecintEditor'
import Polygon from '../2d/Polygon';

const dummyPoligon = new Polygon([
    {x:201.4375, y:689.28125}, 
    {x:277.4375, y:692.28125}, 
    {x:285.4375, y:417.28125}, 
    {x:94.4375, y:403.28125}, 
    {x:17.4375, y:624.28125}, 
    {x:103.4375, y:643.28125}, 
    {x:198.4375, y:652.28125}
])

class RecintEditorPage extends React.Component {
    componentWillMount() {
        this.props.fetch( this.props.match.params.id )
        this.props.fetchZones( '?recint='+this.props.match.params.id )
    }

    render() {
        const { recint, zones } = this.props
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
                <Segment secondary styles={{padding: 0, textAlign:'center'}}>
                    <h1>LOCALIDADES</h1>
                </Segment>
                <Segment styles={{padding:0}}>
                    <RecintEditor 
                        plane={recint.recint_plane} 
                        zones={zones}
                        polygons={{1: dummyPoligon}}
                    />
                </Segment>
            </div> 
        )
    }
}
export default connect(
    ( store, props ) => {
        return {
            recint: store.recints.data.get( parseInt( props.match.params.id, 10 ) ),
            zones: store.recintzones.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetchById, dispatch ),
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch )
        }
    }
)(RecintEditorPage)