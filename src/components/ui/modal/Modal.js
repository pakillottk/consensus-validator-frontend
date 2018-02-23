import React from 'react'
import UIThemeable from '../UIThemeable'

import Segment from '../segment/Segment'

class Modal extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            open: props.open
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({open: newProps.open})
    }

    render() {
        const { open } = this.state
        const { hideClose, title, theme } = this.props
        if( !open ) {
            return null
        }
        return(
            <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 500}}>
                <div style={{
                    background: 'black',
                    opacity: 0.5,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 500
                }}></div>
                <div style={{ zIndex: 501, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <Segment secondary>
                        <h3> 
                            {title} 
                            {!hideClose && <span 
                                className="pointer hovered-transparency"
                                onClick={() => this.setState({open: false})} 
                                style={{marginLeft: theme.margin.medium, float: 'right', color: theme.negative}}
                            >
                                X
                            </span>}
                        </h3>
                    </Segment>
                    <Segment>
                        {this.props.children}
                    </Segment>
                </div>
            </div>
        );
    }
}

export default UIThemeable( Modal )