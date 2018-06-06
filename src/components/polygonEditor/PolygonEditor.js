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
            polygon: props.polygon,
            previewPolygon: null,
            newX: null,
            newY: null
        }

        this.previewContainer = null
        this.updateCursor = this.updateCursor.bind( this );
        this.clickHandler = this.clickHandler.bind( this );
        this.keyHandler = this.keyHandler.bind( this );
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
        this.setState({editing:false, previewPolygon: null})
    }

    componentWillUnmount() {
        this.disableEditMode()
    }

    updateCursor( e ) {
        const { polygon } = this.state
        const { planeContainer } = this.props
        const { pageX, pageY } = e
        //adjusted bounds of plane container
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
            const [ relativeX, relativeY ] = [
                (pageX - scrolledBounds.left),
                (pageY - scrolledBounds.top)
            ]
            this.setState({newX: relativeX, newY: relativeY})   
            this.updatePreview( relativeX, relativeY )  
        }
    }

    clickHandler( e ) {
        this.updatePolygon( new Polygon([
            ...this.state.polygon.points, 
            { x: this.state.newX, y: this.state.newY }
        ]))    
    }

    keyHandler( e ) {
        switch( e.keyCode ) {
          case 13: //ENTER
          case 27: //SCAPE
            this.disableEditMode();
          break;
          default:{
              break;
          }
        }
    }

    updatePreview( x, y ) {
        this.setState({previewPolygon: new Polygon( [...this.state.polygon.points, {x,y}] )})
    }

    createPolygon() {
        this.setState({ polygon:new Polygon(), previewPolygon: new Polygon() })
        this.notifyChanges()
        this.enableEditMode()
    }

    removePolygon() {
        this.setState({ polygon: null })
        this.notifyChanges()
    }

    updatePolygon( polygon ) {
        this.setState({ polygon })
        this.notifyChanges()
    }

    notifyChanges( polygon ) {
        const { onChange } = this.props
        if( onChange ) {
            onChange( this.state.polygon )
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
                    <Button disabled={!polygon || editing} context="relevant">EDITAR</Button>
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
                        fill={`rgba(0, 255, 0, 1.0)`}
                        stroke={`rgba(0, 155, 0, 1.0)`}
                        strokeSize={0.25}
                    />}
                </div>
            </div>
        )
    }
}