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

    renderVertices( color, vertices ) {
        const clickHandler = this.props.onVertexClicked || (() => {})
        const verticesRendered = []
        vertices.forEach(
            ( vertex, index ) => {
                verticesRendered.push(
                    <a key={index} style={{cursor:'pointer', position:'relative', zIndex:15}} onClick={() => {clickHandler( index, vertex )}}>
                        <circle                                                     
                            cx={vertex.x} 
                            cy={vertex.y} 
                            r={4} 
                            style={{fill:color}} 
                        />
                    </a>
                )
            }
        )

        return verticesRendered
    }

    render() {
        const { polygon, strokeSize, stroke, fill, vertexColor, drawVertices } = this.props
        const onClick = this.props.onPolygonClicked || (() => {})
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
                <svg width={ width } height={ height } style={{position:'relative', pointerEvents:'all'}}>
                    { drawVertices && this.renderVertices( vertexColor, polygon.points ) }
                    <a style={{cursor:'pointer', position:'relative', zIndex:14}} onClick={() => onClick()}>
                        <polygon
                            points={formattedPoints}
                            style={{ fill: fill, stroke: stroke, strokeWidth: strokeSize }}
                        />
                    </a>
                </svg>
            </div>
        )
    }
}