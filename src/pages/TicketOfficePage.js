import React from 'react';

import Segment from '../components/ui/segment/Segment'
import Divider from '../components/ui/divider/Divider'
import TicketOfficeController from '../components/ticketOfficeController/TicketOfficeController' 
import ZonedTicketOfficeController from '../components/zonedTicketOfficeController/ZonedTicketOfficeController'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { storeCachedImg, flushCache } from '../redux/actions/imgcache'
import { crud as saleActions } from '../redux/actions/sales'
import { crud as sessionActions } from '../redux/actions/sessions'

import ImgToBase64 from '../utils/ImgToBase64'
import API from '../API/API'
import moment from 'moment'

class TicketOfficePage extends React.Component {
    componentWillMount() {
        this.props.fetchSession( parseInt( this.props.match.params.id, 10 ) )
    }
    //Stores in memory a base64 of the company logo
    async cacheLogoImg( company ) {
        if( company.logo_url ) {
            const logoImg = await ImgToBase64( API.getFullPath( company.logo_url ) )
            this.props.storeCachedImg( 'company_logo', logoImg )
        }
    }

    //Stores in memory a base64 represenation of the session imgs
    async cacheSessionImgs( session ) {
        if( session.header_img ) {
            const headerImg = await ImgToBase64( API.getFullPath( session.header_img ) )
            this.props.storeCachedImg( 'header_img', headerImg )
        }
        if( session.logos_img ) {
            const logosImg = await ImgToBase64( API.getFullPath( session.logos_img ) )
            this.props.storeCachedImg( 'logos_img', logosImg )
        }
    }

    componentWillUnmount() {
        this.props.flushSales()
        this.props.flushCache()
    }

    render() {
        const sessionId = parseInt( this.props.match.params.id, 10 );
        const session = this.props.sessions.get( sessionId );
        
        if( !session ) {
            return null
        }

        this.cacheSessionImgs( session );
        this.cacheLogoImg( session.company );

        const meRole = this.props.meRole;
        const now = new Date();
        const sellers_locked_at = new Date( session.sellers_locked_at );
        const ticketoffice_closed_at = new Date( session.ticketoffice_closed_at );
        if( 
            ( meRole === 'seller' && now > sellers_locked_at ) || 
            ( now > ticketoffice_closed_at )
        ) {
            return(
                <div>
                    <Segment secondary styles={{border:'none'}}>
                        <h1 className="center-aligned">TAQUILLA</h1>
                    </Segment>
                    <Segment secondary styles={{padding: 0}}>
                        { session && <h1 style={{textAlign: 'center'}}> { session.name } </h1> }
                        { session && <h3 style={{textAlign: 'center'}}> { moment( session.date ).locale('es').format( 'DD MMMM YYYY HH:mm' ) } H. </h3> }
                        { session && <h3 style={{textAlign: 'center'}}> { session.location }, {session.recint} </h3> }

                        <Divider full/>

                        <h1 style={{color:'red', textAlign:'center'}}>LA VENTA ESTÁ CERRADA</h1>
                    </Segment>
                </div>
            );
        }
        
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">TAQUILLA</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    { session && <h1 style={{textAlign: 'center'}}> { session.name } </h1> }
                    { session && <h3 style={{textAlign: 'center'}}> { moment( session.date ).locale('es').format( 'DD MMMM YYYY HH:mm' ) } H. </h3> }
                    { session && <h3 style={{textAlign: 'center'}}> { session.location }, {session.recint} </h3> }

                    <Divider full/>

                    {session.ticketing_flow === 'by_types' && <TicketOfficeController sessionId={sessionId} />}
                    {session.ticketing_flow === 'by_zones' && <ZonedTicketOfficeController sessionId={sessionId} plane={session.recint_plane} />}
                </Segment>
            </div>
        );
    }
}

export default connect( 
    ( store, props ) =>  {
        return {
            meRole: store.auth.me.role,
            sessions: store.sessions.data
        }
    },
    ( dispatch ) => {
        return {
            fetchSession: bindActionCreators( sessionActions.fetchById, dispatch ),
            storeCachedImg: bindActionCreators( storeCachedImg, dispatch ),
            flushCache: bindActionCreators( flushCache, dispatch ),
            flushSales: bindActionCreators( saleActions.flush, dispatch )
        }
    }
)( TicketOfficePage )