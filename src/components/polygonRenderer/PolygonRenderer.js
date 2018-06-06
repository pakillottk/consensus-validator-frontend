import React from 'react'

export default class PolygonRenderer extends React.Component {
    stringifyPoints( points ) {
        let formattedPoints = ""
        points.forEach(
            ( point ) => {
                formattedPoints += " " + point.x + ' ' + point.y
            }
        );

        return formattedPoints
    }

    renderVertices( vertices ) {
        const verticesRendered = []
        vertices.forEach(
            ( vertex, index ) => {
                verticesRendered.push(
                    <circle key={index} cx={vertex.x} cy={vertex.y} r={4} style={{fill:'rgba( 0, 255, 0, 0.8 )', cursor: 'pointer'}} />
                )
            }
        )

        return verticesRendered
    }

    render() {
        const { polygon, strokeSize, stroke, fill, drawVertices } = this.props
        if( !polygon ) {
            return null
        }

        const formattedPoints = this.stringifyPoints( polygon.points )
        let [ width, height ] = [ polygon.bounds[ 2 ], polygon.bounds[ 3 ] ]
        if( drawVertices ) {
            width += 4
            height += 4
        }

        return(
            <div style={{width:'100%', height:'100%'}}>
                <svg width={ width } height={ height } style={{pointerEvents:'none'}}>
                    <polygon
                        points={formattedPoints}
                        style={{ fill: fill, stroke: stroke, strokeWidth: strokeSize, pointerEvents:'all' }}
                    />
                    { drawVertices && this.renderVertices( polygon.points ) }
                </svg>
            </div>
        )
    }
}