import Polygon from '../../2d/Polygon'

export default function( store ) {
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
        polygons,
        seats
    }
}