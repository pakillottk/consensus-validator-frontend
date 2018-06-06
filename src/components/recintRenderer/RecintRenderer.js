import React from 'react'
import API from '../../API/API'

import Segment from '../ui/segment/Segment'
import PolygonRenderer from '../polygonRenderer/PolygonRenderer'
import { hexToRGB } from '../../utils/ColorFuncs'

export default class RecintRenderer extends React.Component {
    renderZoneCaption( zone ) {
        return(
            <div key={zone.id} style={{padding:'0 5px'}}>
                {zone.zone}
                <div style={{background:zone.color, height:'10px', width:'100%'}}></div> 
            </div>
        )
    }

    renderPolygon( zone, polygon ) {
        const rgbZoneColor = hexToRGB( zone.color )
        return(
            <PolygonRenderer
                key={polygon.id}
                polygon={polygon}
                fill={`rgba(${rgbZoneColor.r},${rgbZoneColor.g},${rgbZoneColor.b}, 0.5)`}
                stroke={`rgba(${rgbZoneColor.r},${rgbZoneColor.g},${rgbZoneColor.b}, 0.75)`}
                strokeSize={0.25}
            />
        )
    }

    render() {
        const { plane, zones, polygons } = this.props
        if( !plane ) {
            return null
        }

        const zoneCaptions = []
        if( zones ) {
            zones.forEach( zone => {
                zoneCaptions.push( this.renderZoneCaption( zone ) )
            })
        }

        const polygonsRendered = []
        if( polygons ) {
            zones.forEach( zone => {
                const polygon = polygons[ zone.id ]
                if( polygon ) {
                    polygonsRendered.push( this.renderPolygon( zone, polygon ) )
                }
            })
        }

        return(
           <div>
               <Segment styles={{textAlign:'center'}}>
                   <h2>ZONAS</h2>
                   <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        { zoneCaptions }
                   </div>
               </Segment>
               <div style={{position:'relative'}}>
                    <img alt={"Plano del recinto"} src={API.getFullPath(plane)} />
                    <div style={{position:'absolute', top: 0, left: 0, zIndex:10}}>
                        {polygonsRendered}
                    </div>
               </div>
           </div> 
        )
    }
}