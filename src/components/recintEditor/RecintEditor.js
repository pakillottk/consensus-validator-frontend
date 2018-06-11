import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import RecintZoneSelector from '../forms/Controls/RecintZoneSelector/RecintZoneSelector'
import PolygonEditor from '../polygonEditor/PolygonEditor'
import SeatsEditor from '../seatsEditor/SeatsEditor'

import Segment from '../ui/segment/Segment'

export default class RecintEditor extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            editingZone: 0,
            polygons: {...props.polygons},
            rows: {...props.rows} || {},
            planeContainer: null
        }
    }

    editZone( zoneId ) {
        this.setState({editingZone: zoneId})
    }

    updatePolygon( polygon ) {
        const polygons = {...this.state.polygons}
        if( !polygon ) {
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

    render() {
        const { plane, zones } = this.props
        const { polygons, rows, editingZone } = this.state
        return(
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
        )
    }
}