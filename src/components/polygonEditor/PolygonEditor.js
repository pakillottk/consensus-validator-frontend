import React from 'react'
import Polygon from '../../2d/Polygon'
import Button from '../ui/button/Button'
import PolygonRenderer from '../polygonRenderer/PolygonRenderer'
import { inBox } from '../../2d/utils'

export default class PolygonEditor extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            editing: false,
            vertexEdit: false,
            editingVertex: null,
            polygon: props.polygon,
            previewPolygon: props.polygon ? new Polygon( props.polygon.points ) : null,
            newX: null,
            newY: null
        }

        this.previewContainer = null
        this.updateCursor = this.updateCursor.bind( this );
        this.clickHandler = this.clickHandler.bind( this );
        this.keyHandler = this.keyHandler.bind( this );
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            polygon: nextProps.polygon,
            previewPolygon: nextProps.polygon ? new Polygon( nextProps.polygon.points ) : null
        }) 
    }

    enableEditMode() {
        document.addEventListener( 'mousemove', this.updateCursor )
        document.addEventListener( 'mousedown', this.clickHandler )
        document.addEventListener( 'keydown', this.keyHandler )
        this.setState({editing:true})
    }

    disableEditMode() {
        document.removeEventListener( 'mousemove', this.updateCursor );
        document.removeEventListener( 'mousedown', this.clickHandler );
        document.removeEventListener( 'keydown', this.keyHandler );
        this.setState({editing:false, vertexEdit: false, editingVertex: null})
    }

    componentWillUnmount() {
        this.disableEditMode()
    }

    cursorToPlaneCoords( pageX, pageY  ) {
        //adjusted bounds of plane container
        const { planeContainer } = this.props
        const bounds = planeContainer.getBoundingClientRect();
        const scrolledBounds = {
            left: bounds.left + window.scrollX,
            top: bounds.top + window.scrollY,
            right: bounds.left + window.scrollX + bounds.width,
            bottom: bounds.top + window.scrollY + bounds.height
        }
        //if cursor inside recint plane
        if( 
            inBox( 
                scrolledBounds.left, 
                scrolledBounds.top, 
                scrolledBounds.right, 
                scrolledBounds.bottom, 
                { x: pageX, y: pageY } 
            ) 
        ) {
            return {
                x: (pageX - scrolledBounds.left),
                y: (pageY - scrolledBounds.top)
            }
        }

        return null        
    }

    updateCursor( e ) {
        const { pageX, pageY } = e
        //if editing vertices but no vertex selected, returns
        if( this.state.vertexEdit && this.state.editingVertex === null ) {
            return
        }

        const currentPoint = this.cursorToPlaneCoords( pageX, pageY )
        if( currentPoint ) {
            this.setState({newX: currentPoint.x, newY: currentPoint.y})   
            this.updatePreview( currentPoint.x, currentPoint.y, this.state.vertexEdit ? this.state.editingVertex : null )   
        }
    }

    clickHandler( e ) {
        const points = [...this.state.polygon.points]
        if( this.state.vertexEdit ) {
            if( this.state.editingVertex !== null ) {
                points[ this.state.editingVertex ] = {...points[ this.state.editingVertex ], x: this.state.newX, y: this.state.newY} 
                this.setState({editingVertex: null})
            }
        } else {
            points.push( {x: this.state.newX, y: this.state.newY} )
        }
        
        this.updatePolygon( new Polygon(points) )
    }

    keyHandler( e ) {
        switch( e.keyCode ) {
          case 13: { //ENTER
            this.disableEditMode();
            this.notifyChanges( this.state.polygon );
            break;
          }
          case 27: { //SCAPE
            this.disableEditMode();
            break;
          }
          default:{
              break;
          }
        }
    }

    updatePreview( x, y, index=null ) {
        const points = [...this.state.polygon.points]
        if( index === null ) {
            points.push( {x,y} )
        } else {
            points[ index ] = {...points[index], x,y}
        }
        this.setState({previewPolygon: new Polygon( points )})
    }

    createPolygon() {
        this.setState({ polygon:new Polygon(), previewPolygon: new Polygon() })
        this.enableEditMode()
    }

    removePolygon() {
        this.setState({ polygon: null })
        this.notifyChanges( null )
    }

    updatePolygon( polygon ) {
        this.setState({ polygon })
    }

    enterVertexSelect() {
        this.setState({ vertexEdit: true, editingVertex: null })
        this.enableEditMode()
    }

    revertChanges() {
        this.setState({})
    }

    notifyChanges( polygon ) {
        const { onChange } = this.props
        if( onChange ) {
            onChange( polygon )
        }
    }

    render() {
        const { planeContainer } = this.props
        const { polygon, editing } = this.state
        
        //calculate bounds for preview
        const bounds = planeContainer.getBoundingClientRect();
        const scrolledBounds = {
            left: planeContainer.offsetLeft + window.scrollX,
            top: bounds.top + window.scrollY,
            right: bounds.left + window.scrollX + bounds.width,
            bottom: bounds.top + window.scrollY + bounds.height
        }

        return(
            <div>
                <div style={{marginTop:'10px'}}>
                    <Button disabled={polygon || editing} onClick={() => this.createPolygon()} context="dark">CREAR</Button>
                    <Button disabled={!polygon || editing} context="relevant" onClick={() => this.enterVertexSelect()}>EDITAR</Button>
                    <Button disabled={!polygon || editing} onClick={() => this.removePolygon()} context="negative">ELIMINAR</Button>
                </div>
                <div 
                    style={{
                        position:'absolute', 
                        width: scrolledBounds.width+'px', 
                        height:scrolledBounds.height+'px', 
                        top:scrolledBounds.top, 
                        left:scrolledBounds.left, 
                        pointerEvents:'none'
                    }}
                    ref={ ref => {
                        this.previewContainer = ref
                    }}
                >
                    {this.state.previewPolygon && <PolygonRenderer
                        polygon={this.state.previewPolygon}
                        fill={`rgba(0, 255, 0, 0.5)`}
                        stroke={`rgba(0, 100, 0, 1.0)`}
                        strokeSize={1}
                        drawVertices={this.state.editing}
                        vertexColor="rgba(255,0,0,1.0)"
                        onVertexClicked={this.state.vertexEdit ? (
                            (index, vertex) => {
                                this.setState({editingVertex: index})        
                            }) 
                            : (() => {})
                        }
                    />}
                </div>
            </div>
        )
    }
}