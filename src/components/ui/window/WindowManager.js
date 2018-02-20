import React from 'react'
import WindowRenderer from './WindowRenderer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { update, remove } from '../../../redux/actions/windows'

class WindowManager extends React.Component {
    updateWindow( id, data ) {
        this.props.update( id, data )
    }

    removeWindow( id ) {
        this.props.remove( id )
    }

    renderWindows( windows ) {
        const rendered = []
        windows.forEach( window =>  {
            rendered.push( <WindowRenderer key={window.id} window={window} manager={this} /> )
        })

        return rendered
    }

    render() {
        const { windows } = this.props
        if( !windows ) {
            return null
        }
        
        return(
            <div>
                { this.renderWindows( windows ) }
            </div>
        )
    }
}
export default connect( 
    ( store ) => {
        return {
            windows: store.windows.windows
        }
    },
    ( dispatch ) => {
        return {
            update: bindActionCreators( update, dispatch ),
            remove: bindActionCreators( remove, dispatch )
        }
    }
)( WindowManager )