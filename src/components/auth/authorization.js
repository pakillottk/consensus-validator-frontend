import React from 'react';
import { connect } from 'react-redux';
import Segment from '../ui/segment/Segment'

const Authorization = ( allowedRoles ) => ( WrappedComponent, silent, UnauthComponent ) => {
    class WithAuth extends React.Component {
        redirectToLoginIfUnauthenticated( props = this.props ) {
            const { role, history, location } = props;
            if( role === null && history && location && location.pathname !== '/' ) {
                history.replace( '/' );
                return true;
            }

            return false;
        }

        componentDidMount() {
            this.redirectToLoginIfUnauthenticated();
        }

        componentDidUpdate() {
            this.redirectToLoginIfUnauthenticated();
        }

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
            if( role === null ) {
                return null;
            }

            if( this.checkRole( role ) ) {
                return <WrappedComponent {...this.props} />
            }

            if( silent ) {
                return null
            }

            if( UnauthComponent ) {
                return UnauthComponent
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
                role = me.role;
            }

            return {
                role
            };
        }
    )(WithAuth);
}

export default Authorization;