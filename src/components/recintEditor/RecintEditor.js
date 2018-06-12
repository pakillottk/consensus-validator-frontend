import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import RecintZoneSelector from '../forms/Controls/RecintZoneSelector/RecintZoneSelector'
import PolygonEditor from '../polygonEditor/PolygonEditor'
import SeatsEditor from '../seatsEditor/SeatsEditor'

import Segment from '../ui/segment/Segment'
import Button from '../ui/button/Button'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crud as PolygonActions } from '../../redux/actions/zonepolygons'
import { crud as SeatActions } from '../../redux/actions/seatrows'

class RecintEditor extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            editingZone: 0,
            polygons: {...props.polygons},
            rows: {...props.rows} || {},
            planeContainer: null
        }
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({ 
            polygons: nextProps.polygons ? {...nextProps.polygons, ...this.state.polygons} : {},
            rows: nextProps.rows ? {...nextProps.rows, ...this.state.rows} : {} 
        })
    }

    editZone( zoneId ) {
        this.setState({editingZone: zoneId})
    }

    updatePolygon( polygon ) {
        const polygons = {...this.state.polygons}
        if( !polygon ) {
            this.removePolygon( this.state.editingZone )
            delete polygons[ this.state.editingZone ]
        } else {
            polygons[ this.state.editingZone ] = polygon 
        }
        this.setState({polygons})
    }

    updateSeatRows( rows ) {
        const newRows = {...this.state.rows}
        newRows[ this.state.editingZone ] = rows
        this.setState({rows: newRows})
    }

    saveData() {
        const { polygons, rows } = this.state
        const { updatePolygonPoint, storePolygonPoint, storeSeatRow, updateSeatRow } = this.props
        //Store polygon data
        let polygon, isNew
        Object.keys( polygons ).forEach( zoneId => {
            polygon = polygons[ zoneId ]
            //if theres no points ignore
            if( polygon.points.length > 0 ) {
                isNew = polygon.points[0].id === undefined
                if( isNew ) {
                    for( let i = 0; i < polygon.points.length; i++ ) {
                        storePolygonPoint({
                            zone_id: zoneId,
                            vertex_index: i,
                            x: polygon.points[ i ].x,
                            y: polygon.points[ i ].y
                        })
                    }
                } else {
                    for( let i = 0; i < polygon.points.length; i++ ) {
                        updatePolygonPoint(polygon.points[i].id, {
                            x: polygon.points[ i ].x,
                            y: polygon.points[ i ].y
                        })
                    }
                }
            }
        })

        //Store seat data
        let seats
        Object.keys( rows ).forEach( zoneId => {
            seats = rows[ zoneId ]
            if( seats ) {
                for( let i = 0; i < seats.length; i++ ) {
                    if( seats[ i ].id === undefined ) { //isNew
                        storeSeatRow({
                            ...seats[i],
                            row_index: i,
                            zone_id: zoneId
                        })
                    } else { //update
                        updateSeatRow( seats[ i ].id, seats[i] )
                    }
                }
            }
        })
    }

    removePolygon( zoneId ) {
        const { removePolygonPoint } = this.props
        const polygon = this.state.polygons[ zoneId ]
        if( polygon.points.length > 0 ) {
            for( let i = 0; i < polygon.points.length; i++ ) {
                if( polygon.points[ i ].id !== undefined ) {
                    removePolygonPoint( polygon.points[ i ].id )
                }   
            }
        } 
    }

    render() {
        const { plane, zones } = this.props
        const { polygons, rows, editingZone } = this.state
        return(
            <div>
                <Button full context="possitive" onClick={() => this.saveData()}>GUARDAR RECINTO</Button>
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'top'}}>
                    <div>
                        <RecintRenderer
                            onEdit={parseInt(editingZone,10)}
                            plane={plane}
                            zones={zones}
                            polygons={polygons}
                            rows={rows}
                            onPolygonClicked={(zone, polygon) => {
                                this.setState({editingZone: zone.id})
                            }}
                            getPlaneRef={
                                (ref) =>{ 
                                    if( !this.state.planeContainer ) { 
                                        this.setState({planeContainer: ref})
                                    }
                                }
                            }
                        />
                    </div>
                    <div style={{marginTop:'20px', marginLeft:'20px'}}>
                        <div style={{textAlign:'center'}}>
                            <h3>ZONA A EDITAR</h3>
                            <RecintZoneSelector 
                                value={editingZone} 
                                onChange={(event) => this.editZone(event.target.value)} 
                            />
                        </div>
                        {editingZone > 0 && <Segment secondary styles={{textAlign:'center'}}>
                            <h3>POLÍGONO</h3>
                            <PolygonEditor 
                                zone={zones.get( parseInt(editingZone,10) )} 
                                polygon={polygons[ editingZone ]}
                                onChange={this.updatePolygon.bind(this)}
                                planeContainer={this.state.planeContainer}
                            />
                        </Segment>}
                        {editingZone > 0 && <Segment secondary styles={{textAlign:'center'}}>
                            <h3>ASIENTOS</h3>
                            <SeatsEditor
                                rows={rows[ editingZone ]} 
                                onChange={(rows) => this.updateSeatRows(rows)}
                                zone={zones.get( parseInt(editingZone,10) )} 
                                polygon={polygons[ editingZone ]}
                            />
                        </Segment>}
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    () => { return {} },
    ( dispatch ) => {
        return {
            storePolygonPoint: bindActionCreators( PolygonActions.create, dispatch ),
            updatePolygonPoint: bindActionCreators( PolygonActions.update, dispatch ),
            removePolygonPoint: bindActionCreators( PolygonActions.delete, dispatch ),
            storeSeatRow: bindActionCreators( SeatActions.create, dispatch ),
            updateSeatRow: bindActionCreators( SeatActions.update, dispatch )
        }
    }
)(RecintEditor)