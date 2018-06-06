import React from 'react'

import Segment from '../components/ui/segment/Segment'
import RecintForm from '../components/entitites/recints/RecintForm'
import NewRecintZoneButton from '../components/entitites/recintzones/NewRecintZoneButton'
import RecintZonesTable from '../components/entitites/recintzones/RecintZonesTable'
import { crud } from '../redux/actions/recints'
import { crud as ZoneActions } from '../redux/actions/recintzones'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RecintRenderer from '../components/recintRenderer/RecintRenderer'
import Polygon from '../2d/Polygon'

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
                    <RecintRenderer 
                        plane={recint.recint_plane} 
                        zones={zones} 
                        polygons={{
                            1: new Polygon([
                                {x: 50, y: 50 },
                                {x: 150, y: 50 },
                                {x: 150, y: 250 },
                                {x: 50, y: 250 },
                            ])
                        }}
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