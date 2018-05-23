import React from 'react';

import Button from '../components/ui/button/Button'
import Divider from '../components/ui/divider/Divider'
import Segment from '../components/ui/segment/Segment'
import Select from '../components/ui/form/Select/Select'
import Input from '../components/ui/form/Input/Input'
import Table from '../components/ui/table/Table'

import { crud } from '../redux/actions/sessions'
import { crud as TypesActions } from '../redux/actions/types'

import { Bar } from 'react-chartjs-2'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment'
import 'moment/locale/es'

import io from 'socket.io-client'
import SocketConnection from '../API/SocketConnection'

const autoAdjustModes = [
    {value: "conservative", text: "CONSERVADOR"},
    {value: "optimist", text:"OPTIMISTA"},
    {value: "average", text:"A MEDIA"}
]
class SessionPage extends React.Component {
    constructor( props ) {
        super( props )
        
        this.accumDelay = 0 
        this.receivedPongs = 0
        this.lastPingEmittedAt = null
        this.allDelays = []
        this.currentMinDly = Number.MAX_VALUE
        this.currentMaxDly = Number.MIN_VALUE
        this.state = {
            measuring: false,
            pkgSize: 100,
            avgDelay: 0,
            minDelay: 0,
            maxDelay: 0,
            pckDelays:[],
            targetTTL: 1000,
            autoEnabled: false,
            autoAdjustMode:"conservative",
            selectedRooms: {}
        }
    }

    componentWillMount() {
        this.props.fetchById( this.props.match.params.id )
        this.props.fetchTypes( '?session='+this.props.match.params.id )

        //const sessionId = this.props.match.params.id
        this.io = io( SocketConnection.basePath() )
        this.io.on( 'pong_res', () => { this.pongReceived( this.lastPingEmittedAt, new Date() ); } );
        //this.io.emit( 'join', {room: sessionId + '-session'} )        
    }

    pingServer() {
        this.allDelays = []
        this.accumDelay = 0
        this.currentMaxDly = Number.MIN_VALUE
        this.currentMinDly = Number.MAX_VALUE 
        this.receivedPongs = 0
        this.setState({pckDelays:[], measuring: true})
        this.sendPing()
    }

    sendPing() {
        //console.log( 'ping' )
        this.lastPingEmittedAt = new Date()
        const data = []
        for( let i = 0; i < this.state.pkgSize; i++ ){
            data.push( i )
        }
        this.io.emit( 'ping_req', {wheight: data})
        
    }

    pongReceived( pingAt, pongAt ) {
        //console.log( 'pong' )
        const delay = Math.abs( parseInt(pingAt.getTime(),10) - parseInt(pongAt.getTime(), 10) )
        this.currentMinDly = delay < this.currentMinDly ? delay : this.currentMinDly
        this.currentMaxDly = delay > this.currentMaxDly ? delay : this.currentMaxDly
        this.accumDelay += delay        
        this.receivedPongs++
        this.allDelays.unshift( delay )
        if( this.allDelays.length > 50 ) {
            this.allDelays.pop()
        }
        if( this.state.measuring ) {
            setTimeout(() => this.sendPing(), 500)
        }        

        this.setState({
            avgDelay: parseInt(this.accumDelay/this.receivedPongs, 10), 
            pckDelays: [...this.allDelays],
            minDelay: this.currentMinDly,
            maxDelay: this.currentMaxDly,             
        })
    }

    enableAuto() {
        this.setState({autoEnabled: true})
        this.pingServer()
        setTimeout( () => { this.calcTTL() }, 1500 )
    }

    disableAuto() {
        this.setState({autoEnabled:false, measuring: false})
    }

    calcTTL() {
        const { avgDelay, maxDelay, minDelay } = this.state
        let newTTL
        switch( this.state.autoAdjustMode ) {
            case "conservative": {
                newTTL = maxDelay + avgDelay
                break;
            }
            case "optimist": {
                newTTL = avgDelay
                break;
            }
            case "average": {
                newTTL = avgDelay + minDelay
                break;
            }
            default: {
                newTTL = 500
            }
        }

        this.changeTTL( newTTL+500 )
        if( this.state.autoEnabled ) {
            setTimeout(() => this.calcTTL(), newTTL+500)
        }
    }

    changeTTL( ttl ) {
        const { session, types } = this.props
        types.forEach( (type, index) => {
            if( this.state.selectedRooms[type.id] === undefined) {
                return;
            }
            const roomName = type.type === ("UNKNOWN") ? 
                            session.id+'-'+session.name.replace( ' ', '_' )+'-UNKNOWN' :
                            session.id + '-' + session.name.replace( ' ', '_' ) + '-' + type.id + '-' + type.type.replace( ' ', '_' )
            this.io.emit( 'adjust_ttl', {
                room: roomName,
                TTL: ttl
            })
        });

        this.setState({targetTTL: ttl})
    }

    render() {
        const { session } = this.props
        if( !session ) {
            return(
                <div>
                    <Segment secondary>
                        <h1>CARGANDO</h1>
                    </Segment>
                </div>
            )
        }

        const chartDatasets = []
        this.state.pckDelays.forEach( ( dly, index ) => {
            chartDatasets.push({
                label: 'pkg'+index,
                data: [dly],
                borderColor: 'darkgreen',
                backgroundColor: 'lightgreen'
            })
        })

        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">ANALIZADOR</h1>                
                </Segment>
                <Segment>
                    { session && <h1 style={{textAlign: 'center'}}> { session.name } </h1> }
                    { session && <h3 style={{textAlign: 'center'}}> { moment( session.date ).locale('es').format( 'DD MMMM YYYY HH:mm' ) } H. </h3> }
                    { session && <h3 style={{textAlign: 'center'}}> { session.location }, {session.recint} </h3> }

                    <Divider full/>
                    <p style={{textAlign:'center'}}>TAMAÑO DE PAQUETE</p>                    
                    <Input 
                        disabled={this.state.measuring}
                        type="number" 
                        value={this.state.pkgSize} 
                        onChange={(event) => this.setState({pkgSize:event.target.value})}  
                    />
                    {!this.state.measuring && <Button onClick={() =>{ this.pingServer() }}> PING </Button>}
                    {this.state.measuring && !this.state.autoEnabled && <Button context="negative" onClick={() =>{ this.setState({measuring: false}) }}> DETENER MEDICIÓN </Button>}
                    
                    <Segment secondary>
                        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'center'}}>
                            <Segment secondary styles={this.state.measuring ? {pointerEvents:'none', opacity:0.7}: {}}>
                                <p style={{textAlign:'center'}}>AJUSTAR SALA</p>
                                <Table
                                    multiselect
                                    selected={this.state.selectedRooms}
                                    fields={[{name:"type", label:'SALA'}]}
                                    items={this.props.types}
                                    onSelection={(selected) => this.setState({selectedRooms:selected})}
                                />
                            </Segment>
                            <Segment secondary>
                                <p style={{textAlign:'center'}}>MODO AJUSTE AUTOMÁTICO</p>
                                <Select 
                                    disabled={this.state.autoEnabled}
                                    value={this.state.autoAdjustMode} 
                                    options={autoAdjustModes}
                                    onChange={(event)=>this.setState({autoAdjustMode:event.target.value})}
                                />
                                {!this.state.autoEnabled && !this.state.measuring && <Button context="relevant" onClick={() => this.enableAuto()}> AUTO </Button>}
                                {this.state.autoEnabled && <Button context="relevant" onClick={() => this.disableAuto()}> PARAR </Button>}
                                <p style={{fontSize:'0.65rem'}}> 
                                    <b>CONSERVADOR: </b> Máximo retardo registrado + 500ms. <br />
                                    <b>OPTIMISTA: </b> Mínimo retardo registrado + media + 500ms. <br />
                                    <b>A MEDIA: </b> Media de retardos registrados + 500ms.
                                </p>                                
                            </Segment>
                            <Segment secondary>
                                <p style={{textAlign:'center'}}>AJUSTAR TTL (ms)</p> 
                                <Input 
                                    disabled={this.state.autoEnabled}
                                    value={this.state.targetTTL} 
                                    onChange={(event) => this.setState({targetTTL: event.target.value})} 
                                    type="number"
                                />
                                {!this.state.autoEnabled && <Button context="dark" onClick={()=>this.changeTTL(this.state.targetTTL)}> MANUAL </Button>}
                                <p style={{fontSize:'0.65rem'}}> 
                                    El tiempo mínimo (por el procesado), debe ser de unos 500ms 
                                </p>                                
                            </Segment>
                        </div>
                    </Segment>

                    <Table
                        full
                        fields={[
                            {name:'avgDelay', label:'TIEMPO RESPUESTA (ms)'},
                            {name:'minDelay', label:'MIN. DELAY (ms)'},
                            {name:'maxDelay', label:'MÁX. DELAY (ms)'},
                            {name:'pckAmmount', label:'PAQUETES ENVIADOS'}
                        ]}
                        items={[{
                            avgDelay: this.state.avgDelay,
                            pckAmmount: this.state.pckDelays.length,
                            minDelay: this.state.minDelay,
                            maxDelay: this.state.maxDelay
                        }]}
                    />
                    <div style={{position:'relative', height:'400px', marginTop:'20px'}}>
                        <Bar
                            data={{
                                datasets:chartDatasets
                            }}
                            options={{
                                animation: {
                                    duration:0
                                },
                                legend: {
                                    display: false
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                        }
                                    }]
                                }
                            }}
                        />
                    </div>
                </Segment>
            </div>
        );
    }
}

export default connect(
    ( store, props ) => {
        return {
            session: store.sessions.data.get( parseInt( props.match.params.id, 10 ) ),
            types: store.types.data.set( 0, {id: 0, type:"UNKNOWN"} )
        }
    },
    ( dispatch ) => {
        return {
            fetchById: bindActionCreators( crud.fetchById, dispatch ),
            fetchTypes: bindActionCreators( TypesActions.fetch, dispatch )
        }
    }
)(SessionPage)