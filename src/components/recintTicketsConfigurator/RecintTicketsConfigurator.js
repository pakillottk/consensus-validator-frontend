import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import SeatPricesTable from '../entitites/seatprices/SeatPricesTable'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crud as ZoneActions } from '../../redux/actions/recintzones'
import { crud as PolygonActions } from '../../redux/actions/zonepolygons'
import { crud as SeatActions } from '../../redux/actions/seatrows'
import ExtractRecintDataFromStore from '../../entities/Recints/ExtractRecintDataFromStore'

class RecintTicketsConfigurator extends React.Component {
    componentWillMount() {
        const { sessionId, fetchZones, fetchPolygons, fetchSeats } = this.props

        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
    }

    render() {
        const { plane, zones, polygons, seats } = this.props
        if( !zones || !plane ) {
            return null
        }

        return(
            <div style={{display:'flex', flexWrap:'wrap', alignItems:'flex-start'}}>
                <RecintRenderer
                    plane={plane}
                    zones={zones}
                    polygons={polygons}
                    rows={seats}
                />
                <SeatPricesTable sessionId={this.props.sessionId} />
            </div>
        )
    }
}

export default connect(
    ( store, props ) => {
        const recintData = ExtractRecintDataFromStore( store )

        return {
            zones: store.recintzones.data,
            polygons: recintData.polygons,
            seats: recintData.seats
        }
    },
    ( dispatch ) => {
        return {
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolygons: bindActionCreators( PolygonActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch )
        }
    }
)(RecintTicketsConfigurator)