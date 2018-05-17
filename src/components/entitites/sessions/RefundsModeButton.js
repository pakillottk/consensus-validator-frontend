import React from 'react'

import { crud } from '../../../redux/actions/sessions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Segment from '../../ui/segment/Segment'
import Text from '../../ui/text/Text'
import Button from '../../ui/button/Button'

class RefundsModeButton extends React.Component {
    switchRefunds() {
        const { session } = this.props
        this.props.updateSession( session.id, { refund_mode: !session.refund_mode } )
    }

    render() {
        const { session } = this.props
        if( !session ) {
            return null
        }

        return(
            <Segment styles={{textAlign:'center', border:'none'}}>
                LAS DEVOLUCIONES ESTÁN: 
                { 
                  session.refund_mode ?  
                   (<Text type="possitive" styles={{fontWeight:'bold', fontSize:'1.4rem'}}>ACTIVADAS</Text>)
                  :
                   (<Text type="negative" styles={{fontWeight:'bold', fontSize:'1.4rem'}}>DESACTIVADAS</Text>) 
                }
                <Button context={session.refund_mode ? "negative":"possitive"} onClick={() => this.switchRefunds()}>
                    {session.refund_mode ? "DESACTIVAR":"ACTIVAR"}
                </Button>
            </Segment>
        );
    }
}
export default connect(
    ( store, props ) => {
        return {
            session: store.sessions.data.get( parseInt( props.id, 10 ) )
        }
    },
    ( dispatch ) => {
        return {
            updateSession: bindActionCreators( crud.update, dispatch )
        }
    }
)( RefundsModeButton )