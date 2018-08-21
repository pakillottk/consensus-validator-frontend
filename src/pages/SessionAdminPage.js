import React from 'react';

import Segment from '../components/ui/segment/Segment'
import Divider from '../components/ui/divider/Divider'
import SessionForm from '../components/entitites/sessions/SessionForm'
import RefundsModeButton from '../components/entitites/sessions/RefundsModeButton'

import NewSessionSupervisorButton from '../components/entitites/sessionsupervisors/NewSessionSupervisorButton'
import SessionSupervisorsTable from '../components/entitites/sessionsupervisors/SessionSupervisorsTable'
import NewTypeButton from '../components/entitites/types/NewTypeButton'
import TypesTable from '../components/entitites/types/TypesTable'
import NewDeliverButton from '../components/entitites/deliveries/NewDeliverButton'
import DeliveriesTable from '../components/entitites/deliveries/DeliveriesTable'
import NewComissionButton from '../components/entitites/comissions/NewComissionButton'
import ComissionsTable from '../components/entitites/comissions/ComissionsTable'
import NewScanGroupButton from '../components/entitites/scangroups/NewScanGroupButton'
import ScanGroupsTable from '../components/entitites/scangroups/ScanGroupsTable'
import ScanTypesTable from '../components/entitites/scantypes/ScanTypesTable'
import UserScanGroupTable from '../components/entitites/userscangroups/UserScanGroupsTable'
import RecintTicketsConfigurator from '../components/recintTicketsConfigurator/RecintTicketsConfigurator'

import CodesFilter from '../components/entitites/codes/CodesFilters'
import CodesTable from '../components/entitites/codes/CodesTable'
import CSVInput from '../components/forms/Controls/CSVInput/CSVInput'
import CSVTable from '../components/CSVPreview/CSVPreview'
import CSVUploadButton from '../components/CSVUploadButton/CSVUploadButton'

import CodeGenerator from '../components/entitites/codes/CodeGenerator'

import { crud } from '../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class SessionAdminPage extends React.Component {
    componentWillMount() {
        const sessionId = this.props.match.params.id;
        this.props.fetch( sessionId )
    }

    render() {
        const { session } = this.props
        const sessionId = parseInt( this.props.match.params.id, 10 );
        if( !session ) {
            return(
                <div>
                    <Segment secondary>
                        <h1>LA SESIÓN NO EXISTE O NO ESTÁ AUTORIZADO</h1>
                    </Segment>
                </div>
            )
        }
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">ADMINISTRAR SESIÓN</h1>
                </Segment>
                <Segment>
                    <SessionForm id={ sessionId } />
                </Segment>
                <Segment>
                    <RefundsModeButton id={ sessionId } />
                </Segment>
                <Segment>
                    <Segment secondary styles={{border:'none'}}>
                        <h1 className="center-aligned">CONTROL CÓDIGOS</h1>
                    </Segment>
                    <div>
                        <div>
                            <h2 style={{textAlign: 'center'}}>CARGAR CSV</h2>
                            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>                                
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <CSVInput />
                                    <CSVUploadButton sessionId={ sessionId } />
                                </div>
                            </div>
                            <CSVTable />
                        </div>

                        <div>
                            <h2 style={{textAlign: 'center'}}>CÓDIGOS</h2>
                            <CodesFilter sessionId={ sessionId } hidden={{type: true, updated_at: true}}/>
                            <Segment secondary>
                                <h3 style={{textAlign: 'center'}}>GENERAR CÓDIGOS</h3>
                            </Segment>
                            <CodeGenerator sessionId={ sessionId } />
                            <CodesTable sessionId={ sessionId } />                            
                        </div>
                    </div>

                    <Divider full />

                    <Segment secondary styles={{border:'none'}}>
                        <h1 className="center-aligned">SUPERVISORES DEL EVENTO</h1>
                    </Segment>
                    <NewSessionSupervisorButton sessionId={ sessionId } />
                    <SessionSupervisorsTable sessionId={ sessionId } />

                    <Divider full />
                    
                    <Segment secondary styles={{border:'none'}}>
                        <h1 className="center-aligned">CONTROL ENTRADAS</h1>
                    </Segment>                    
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>                        
                        <div>
                            <h2 style={{textAlign: 'center'}}>TIPOS</h2>
                            <NewTypeButton sessionId={sessionId} />
                            <TypesTable sessionId={ sessionId } />
                        </div>
                        <div>
                            <h2 style={{textAlign: 'center'}}>ENTREGAS</h2>
                            <NewDeliverButton />
                            <DeliveriesTable sessionId={sessionId} />
                        </div>                   
                        <div>
                            <h2 style={{textAlign: 'center'}}>GASTOS Y COMISIONES</h2>
                            <NewComissionButton sessionId={sessionId} />
                            <ComissionsTable sessionId={sessionId} />
                        </div>
                        {session.ticketing_flow === 'by_zones' && <div>
                            <h2 style={{textAlign: 'center'}}>ASIGNAR ZONAS/LOCALIDADES</h2>
                            <RecintTicketsConfigurator sessionId={sessionId} plane={session.recint_plane} />
                        </div>}
                    </div>

                    <Divider full />

                    <Segment secondary styles={{border:'none'}}>
                        <h1 className="center-aligned">CONTROL ESCÁNERES</h1>
                    </Segment>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                        <div>
                            <h2 style={{textAlign: 'center'}}>GRUPOS DE ESCANEO</h2>
                            <NewScanGroupButton sessionId={sessionId} />
                            <ScanGroupsTable sessionId={sessionId} />
                        </div>
                        <div>
                            <h2 style={{textAlign: 'center'}}>TIPOS ESCANEABLES</h2>
                            <ScanTypesTable />
                        </div>
                        <div>
                            <h2 style={{textAlign: 'center'}}>GRUPOS ASIGNADOS</h2>
                            <UserScanGroupTable sessionId={sessionId} />
                        </div>
                    </div>                    
                </Segment>
            </div>
        );
    }
}

export default connect(
    ( store, props ) => { 
        return {
            session: store.sessions.data.get( parseInt( props.match.params.id, 10 ) )
        }; 
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetchById, dispatch )
        }
    }
)( SessionAdminPage )