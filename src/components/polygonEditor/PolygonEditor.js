import React from 'react'
import Polygon from '../../2d/Polygon'
import Button from '../ui/button/Button'
import { inBox } from '../../2d/utils'

export default class PolygonEditor extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            editing: false,
            polygon: props.polygon
        }

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
        this.setState({editing:false})
    }

    componentWillUnmount() {
        this.disableEditMode()
    }

    updateCursor( e ) {
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
            //TODO: update polygon
        }
    }

    clickHandler( e ) {
        console.log( 'click' )    
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

    createPolygon() {
        this.setState({ polygon:new Polygon() })
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
        const { polygon, editing } = this.state
        return(
            <div style={{marginTop:'10px'}}>
                <Button disabled={polygon || editing} onClick={() => this.createPolygon()} context="dark">CREAR</Button>
                <Button disabled={!polygon || editing} context="relevant">EDITAR</Button>
                <Button disabled={!polygon || editing} onClick={() => this.removePolygon()} context="negative">ELIMINAR</Button>
            </div>
        )
    }
}