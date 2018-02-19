import React from 'react';
import { connect } from 'react-redux';
import Segment from '../ui/segment/Segment'

const Authorization = ( allowedRoles ) => ( WrappedComponent ) => {
    class WithAuth extends React.Component {
        checkRole( role ) {
            if( role ) {
                if( allowedRoles === '*' ) {
                    return true;
                }

                return allowedRoles.includes( role );
            }

            return false;
        }

        render() {
            const { role } = this.props;

            if( this.checkRole( role ) ) {
                return <WrappedComponent {...this.props} />
            }

            return <Segment secondary styles={{position:'fixed', height:'100vh', width:'100vw'}}>
                <p style={{fontSize:'1.25rem'}}>NO AUTORIZADO</p>
            </Segment>;
        }
    }

    return connect(
        ( store ) => {
            let role = null;
            const me = store.auth.me;
            if( me !== null ) {
                role = me.role.role;
            }

            return {
                role
            };
        }
    )(WithAuth);
}

export default Authorization;