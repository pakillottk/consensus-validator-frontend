import React from 'react'
import API from '../../API/API'

import Segment from '../ui/segment/Segment'
import PolygonRenderer from '../polygonRenderer/PolygonRenderer'
import SeatsRenderer from '../seatsRenderer/SeatsRenderer'
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
                    fill={`rgba(${rgbZoneColor.r},${rgbZoneColor.g},${rgbZoneColor.b},0.35)`}
                    stroke={`rgba(${rgbZoneColor.r},${rgbZoneColor.g},${rgbZoneColor.b}, 0.75)`}
                    strokeSize={0.25}
                    onPolygonClicked={() => onClick( zone, polygon )}
                />
            </div>
        )
    }

    renderSeats( zone, polygon, rows, onEdit=false ) {
        const { onSeatHover, onSeatHoverExit } = this.props
        const rgbZoneColor = hexToRGB( zone.color )
        return(
            <div key={zone.id} style={{pointerEvents:'none', position:'absolute', top: 0, left: 0, zIndex:11}}>
                <SeatsRenderer
                    color={rgbZoneColor}
                    rows={rows}
                    zone={zone}
                    polygon={polygon}
                    showCurves={onEdit}
                    showLines={onEdit}
                    onSeatHover={onSeatHover}
                    onSeatHoverExit={onSeatHoverExit}
                />
            </div>
        )
    }

    render() {
        const { plane, zones, onEdit, showPolygons, polygons, rows, getPlaneRef } = this.props
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
        const seatsRendered = []
        if( polygons ) {
            zones.forEach( zone => {
                const polygon = polygons[ zone.id ]
                if( polygon ) {
                    if( onEdit !== zone.id && showPolygons ) {
                        polygonsRendered.push( this.renderPolygon( zone, polygon ) )
                    } 
                    if( rows ) {
                        if( rows[ zone.id ] ) {
                            seatsRendered.push( this.renderSeats( zone, polygon, rows[ zone.id ], onEdit === zone.id ) )
                        }
                    }
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
                    {seatsRendered}  
                    {this.props.children}            
               </div>
           </div> 
        )
    }
}