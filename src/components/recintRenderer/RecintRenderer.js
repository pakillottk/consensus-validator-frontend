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
        const onClick = this.props.onPolygonClicked || (() => {})
        const rgbZoneColor = hexToRGB( zone.color )
        return(
            <div key={polygon.id} style={{position:'absolute', top: 0, left: 0, zIndex:10}}>
                <PolygonRenderer                    
                    polygon={polygon}
                    fill={`rgba(${rgbZoneColor.r},${rgbZoneColor.g},${rgbZoneColor.b},0.5)`}
                    stroke={`rgba(${rgbZoneColor.r},${rgbZoneColor.g},${rgbZoneColor.b}, 0.75)`}
                    strokeSize={0.25}
                    onPolygonClicked={() => onClick( zone, polygon )}
                />
            </div>
        )
    }

    render() {
        const { plane, zones, onEdit, polygons, getPlaneRef } = this.props
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
                if( polygon && onEdit !== zone.id ) {
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
               <div 
                    style={{position:'relative'}} 
                    ref={ (ref) =>{
                        if( getPlaneRef ) {
                            getPlaneRef( ref )
                        }
                    }}
                >
                    <img alt={"Plano del recinto"} src={API.getFullPath(plane)} />                    
                    {polygonsRendered}                    
               </div>
           </div> 
        )
    }
}