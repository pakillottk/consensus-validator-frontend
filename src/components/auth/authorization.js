import React from 'react';
import { connect } from 'react-redux';

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

            return null;
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