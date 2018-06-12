import React from 'react'

import Segment from '../components/ui/segment/Segment'
import RecintForm from '../components/entitites/recints/RecintForm'
import NewRecintZoneButton from '../components/entitites/recintzones/NewRecintZoneButton'
import RecintZonesTable from '../components/entitites/recintzones/RecintZonesTable'
import { crud } from '../redux/actions/recints'
import { crud as ZoneActions } from '../redux/actions/recintzones'
import { crud as PolyActions } from '../redux/actions/zonepolygons'
import { crud as SeatActions } from '../redux/actions/seatrows'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RecintEditor from '../components/recintEditor/RecintEditor'
import Polygon from '../2d/Polygon';

class RecintEditorPage extends React.Component {
    componentWillMount() {
        this.props.fetch( this.props.match.params.id )
        this.props.fetchZones( '?recint='+this.props.match.params.id )
        this.props.fetchPolys( '?recint='+this.props.match.params.id )
        this.props.fetchSeats( '?recint='+this.props.match.params.id )
    }

    render() {
        const { recint, zones, polygons, seats } = this.props
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
                        polygons={polygons}
                        rows={seats}
                    />
                </Segment>
            </div> 
        )
    }
}
export default connect(
    ( store, props ) => {
        const polyData = store.zonepolygons.data.sort( (a,b) => {
            return a.vertex_index < b.vertex_index ? -1.0 : 1.0
        })
        const polygonPoints = {}
        polyData.forEach( polyPoint => {
            if( !polygonPoints[ polyPoint.zone_id ] ) {
                polygonPoints[ polyPoint.zone_id ] = [ polyPoint ]
            } else {
                polygonPoints[ polyPoint.zone_id ].push( polyPoint )
            }
        })

        const polygons = {}
        Object.keys( polygonPoints ).forEach( zone => {
            polygons[ zone ] = new Polygon( polygonPoints[ zone ] )
        })

        const seatData = store.seatrows.data.sort( (a,b) => {
            return a.row_index < b.row_index ? -1.0 : 1.0
        })
        const seats = {}
        seatData.forEach( seatRow => {
            if( !seats[ seatRow.zone_id ] ) {
                seats[ seatRow.zone_id ] = [ seatRow ]
            } else {
                seats[ seatRow.zone_id ].push( seatRow )
            }
        })       

        return {
            recint: store.recints.data.get( parseInt( props.match.params.id, 10 ) ),
            zones: store.recintzones.data,
            polygons,
            seats
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetchById, dispatch ),
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolys: bindActionCreators( PolyActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch )
        }
    }
)(RecintEditorPage)