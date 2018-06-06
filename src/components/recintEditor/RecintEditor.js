import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import RecintZoneSelector from '../forms/Controls/RecintZoneSelector/RecintZoneSelector'
import PolygonEditor from '../polygonEditor/PolygonEditor'

import Segment from '../ui/segment/Segment'

export default class RecintEditor extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            editingZone: 0,
            polygons: {...props.polygons},
            planeContainer: null
        }
    }

    editZone( zoneId ) {
        this.setState({editingZone: zoneId})
    }

    updatePolygon( polygon ) {
        const polygons = {...this.state.polygons}
        polygons[ this.state.editingZone ] = polygon
        this.setState({polygons})
    }

    render() {
        const { plane, zones } = this.props
        const { polygons, editingZone } = this.state
        return(
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'top'}}>
                <div>
                    <RecintRenderer
                        plane={plane}
                        zones={zones}
                        polygons={polygons}
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
                </div>
            </div>
        )
    }
}