import React from 'react'

import RecintRenderer from '../recintRenderer/RecintRenderer'
import SeatPriceRenderer from '../seatPriceRenderer/SeatPriceRenderer'
import PrintTicket from '../printTicket/PrintTicket'
import Button from '../ui/button/Button'
import ConfirmModal from '../confirmModal/ConfirmModal'
import Input from '../ui/form/Input/Input'
import Select from '../ui/form/Select/Select'
import Label from '../ui/form/Label/Label'
import Segment from '../ui/segment/Segment'
import Table from '../ui/table/Table'
import Tabs from '../ui/tabs/Tabs'
import Currency from 'react-currency-formatter'

import SalesFilters from '../entitites/sales/SalesFilters'
import SalesTable from '../entitites/sales/SalesTable'

import PaymentFilters from '../entitites/payments/PaymentFilters'
import NewPaymentButton from '../entitites/payments/NewPaymentButton'
import PaymentsTable from '../entitites/payments/PaymentsTable'

import { connect } from 'react-redux'
import  { bindActionCreators } from 'redux'
import { crud as ZoneActions } from '../../redux/actions/recintzones'
import { crud as PolygonActions } from '../../redux/actions/zonepolygons'
import { crud as SeatActions } from '../../redux/actions/seatrows'
import { crud as ReservesActions } from '../../redux/actions/seatreserves'
import { crud as SeatPricesActions } from '../../redux/actions/seatprices'
import { crud as SalesActions } from '../../redux/actions/sales'
import { crud as TypeActions } from '../../redux/actions/types'
import { crud as ComissionActions } from '../../redux/actions/comissions'
import { crud as PaymentActions } from '../../redux/actions/payments'

import ExtractRecintDataFromStore from '../../entities/Recints/ExtractRecintDataFromStore'
import ApplyComission from '../../entities/comissions/ApplyComission'
import CalculateSellerComission from '../../entities/comissions/CalculateSellerComission'
import moment from 'moment'

class ZonedTicketOfficeController extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            seatInfo: null,
            selectedSeats: [],
            showBuyDialog: false,
            selectedPrice: -1,
            name: ''
        }
    }
    componentWillMount() {
        const { 
            sessionId, 
            fetchZones, 
            fetchPolygons, 
            fetchSeats, 
            fetchReserves, 
            fetchSeatPrices,
            fetchSales,
            fetchTypes,
            fetchComissions,
            fetchPayments
        } = this.props

        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
        fetchReserves( '?session='+sessionId )
        fetchSeatPrices( '?session='+sessionId )
        fetchSales( '?session='+sessionId )
        fetchTypes( '?session='+sessionId )
        fetchComissions( '?session='+sessionId )
        fetchPayments( '?session='+sessionId )

        this.setState({selectedSeats:[], seatInfo: null})
    }

    componentWillReceiveProps( nextProps ) {
        if( nextProps.toSelection ) {
            if( !this.isSeatInArray( this.state.selectedSeats, nextProps.toSelection ) ) {
                this.selectSeat(
                    nextProps.toSelection.zoneId,
                    nextProps.toSelection.row,
                    nextProps.toSelection.seatIndex,
                    nextProps.toSelection.seatNumber,
                    nextProps.toSelection.position,
                    nextProps.toSelection.seatState,
                    nextProps.toSelection.seatPrice
                )
            }
        }
        if( nextProps.toDeselect ) {
            if( this.isSeatInArray( this.state.selectedSeats, nextProps.toDeselect ) ) {
                this.deselectSeat( nextProps.toDeselect.index )
            }
        }
    }

    isSeatInArray( seatsArray, seatData ) {
        let seatFound = null
        seatsArray.some( seat => {
            if(    
                seat.zoneId === seatData.zoneId &&
                seat.row === seatData.row &&
                seat.seatIndex === seatData.seatIndex
            ) {
                seatFound = seat
                return true
            }

            return false
        })

        return seatFound
    }

    deselectAll() {
        this.state.selectedSeats.forEach( selected => {
            this.voidReserve( selected.seatState.reserve_id, selected )
        })
    }

    deselectSeat( index ) {
        let selectedSeats = [...this.state.selectedSeats]
        selectedSeats.splice( index, 1 )
        for( let i = index; i < selectedSeats.length; i++ ) {
            selectedSeats[ i ].index--
        }
        this.setState({selectedSeats})
    }

    selectSeat( zoneId, row, seatIndex, seatNumber, position, seatState, seatPrice ) {
        const selectedSeats = [...this.state.selectedSeats]
        const seatData = {
            index: selectedSeats.length,
            zoneId,
            zone: this.props.zones.get( parseInt(zoneId,10) ).zone,
            row,
            seatIndex,
            seatNumber,
            position,
            seatState,
            seatPrice
        } 
        selectedSeats.push( seatData )
        this.setState({selectedSeats})
    }

    voidReserve( id, toDeselect ) {
        this.props.removeReserve( id, {
            toDeselect
        })
    }

    clickedSeat( zoneId, row, seatIndex, seatNumber, position, seatState, seatPrice ) {
        const { createReserve, sessionId, me } = this.props
        const seatData = {
            zoneId,
            row,
            seatIndex,
            seatNumber,
            position,
            seatState,
            seatPrice: seatPrice.sort( (price, otherPrice) => {
                return price.price < otherPrice.price;
            })
        }

        //if seats selected, ensure same types, else ignore click
        if( this.state.selectedSeats.length > 0 ) {
            if( seatData.seatPrice.length !== this.state.selectedSeats[ 0 ].seatPrice.length ) {
                return;
            } else {
                const filteredTypes = seatData.seatPrice.filter( (price, index) => {
                    return price.id === this.state.selectedSeats[ 0 ].seatPrice[ index ].id
                })
                if( filteredTypes.length !== this.state.selectedSeats[ 0 ].seatPrice.length ) {
                    return;
                }
            }
        }

        const seatStored = this.isSeatInArray( this.state.selectedSeats, seatData )         
        if( seatState.state === 'LIBRE' && !seatStored ) { //Free and not selected
            createReserve(
                {
                    session_id: sessionId,
                    zone_id: zoneId,
                    seat_row: row,
                    seat_index: seatIndex,
                    user_id: me.id,
                    expires_at: moment.utc( moment().add( 5, 'm' ) ).format()
                }, 
                '', 
                {
                    toSelection: seatData
                }
            )
        } else { //Not free
            //if reserved by me, else ignore click
            if( parseInt(seatState.reservedBy, 10) === parseInt(me.id, 10) ) {
                if( seatStored ) { //already reserved and selected: deselect and void reserve
                    this.voidReserve( seatState.reserve_id, seatStored )
                } else { //already reserved but no selected: add to selection
                    this.selectSeat(
                        seatData.zoneId,
                        seatData.row,
                        seatData.seatIndex,
                        seatData.seatNumber,
                        seatData.position,
                        seatState,
                        seatPrice
                    )
                }
            }
        }           
    }

    showSeatPrice( zoneId, row, seatIndex, seatNumber, position ) {
        this.setState({
            seatInfo:<SeatPriceRenderer 
                        zoneId={zoneId} 
                        row={row} 
                        seatIndex={seatIndex}
                        seatNumber={seatNumber}
                        position={position}
                    />
        })
    }

    buySelectedSeats() {
        const { selectedSeats } = this.state
        const { me, createSale } = this.props

        let seat
        for( let i = 0; i < selectedSeats.length; i++ ) {
            seat = selectedSeats[ i ]  
            createSale(
                {
                    type_id: seat.seatPrice[ this.state.selectedPrice ].id, 
                    zone_id: seat.zoneId,
                    row_index: seat.row,
                    seat_index: seat.seatIndex,
                    seat_number: seat.seatNumber,
                    name: this.state.name !== '' ? this.state.name : me.username 
                }, 
                '',  
                {current: (i+1), total: parseInt(selectedSeats.length, 10)}
            )
        }

        this.setState({selectedSeats:[], selectedPrice:-1, name:'', showBuyDialog:false})
    }

    computeCurrentPrice() {
        const { types, comissionByUser, me } = this.props
        const type = types.get( 
            parseInt(
                this.state.selectedSeats[0].seatPrice[this.state.selectedPrice].id, 10
            ) 
        )
        if( !type ) {
            return;
        }
        let realPrice = type.price
        if( comissionByUser[ me.id ] ) {
            realPrice = ApplyComission( type, comissionByUser[ me.id ][ type.session_id ] )
        }

        return realPrice * this.state.selectedSeats.length
    }

    renderPriceSelect() {
        if( this.state.selectedSeats.length === 0 ) {
            return null
        }

        const prices = this.state.selectedSeats[0].seatPrice
        const priceOptions = prices.map( (price, index) => {
            return {
                text: price.type + '(' + price.price + '€)',
                value: index
            }
        })
        priceOptions.unshift({text:'SELECCIONE', value:-1})

        return (
            <Select
                options={priceOptions}
                value={this.state.selectedPrice}
                onChange={(e)=>this.setState({selectedPrice:e.target.value})}
            />
        )
    }

    renderBuyDialog() {
        let singlePrice = false
        if( this.state.showBuyDialog && this.state.selectedSeats[0].seatPrice.length === 1 ) {
            singlePrice = true
            if( this.state.selectedPrice !== 0 ) {
                this.setState({ selectedPrice: 0 })
            }
        }
        return(
            <ConfirmModal
                open={this.state.showBuyDialog}
                title={'COMPRAR LOCALIDADES'}
                message=''
                onConfirm={()=>{
                    this.buySelectedSeats()
                }}
                onCancel={()=>{
                    this.deselectAll()
                    this.setState({selectedPrice:-1, name:'', showBuyDialog:false})
                }}
            >
                <div>
                    <h3 style={{color:'red'}}> 
                        Una vez confirmada la venta, no se podrá deshacer/eliminar.
                        Asegúrese de recaudar el importe antes de confirmar. 
                    </h3>
                    <div>
                        <Label>NOMBRE</Label>
                        <Input 
                            value={this.state.name} 
                            onChange={(e) => this.setState({name: e.target.value})}
                        />
                    </div>
                    {!singlePrice && <div>
                        <Label>PRECIO</Label>
                        {this.renderPriceSelect()}
                    </div>}
                    {this.state.selectedSeats.length > 0 && this.state.selectedPrice >= 0 && 
                        <div style={{textAlign:'center'}}>
                            <h4>
                                {this.state.selectedSeats.length} ENTRADAS DE {this.state.selectedSeats[0].seatPrice[this.state.selectedPrice].type}
                            </h4>
                            <h3>
                                TOTAL A PAGAR:  
                                <span style={{color:'red'}}>
                                    <Currency
                                        currency='EUR'
                                        quantity={this.computeCurrentPrice()}
                                    />
                                </span>
                            </h3>
                        </div>
                    }
                </div>
            </ConfirmModal>
        )
    }

    renderSummaryList() {
        const { types, totalPaid, salesByType, revenueByType, comissionsByType, totalComission } = this.props
        const items = []
        let revenue = 0
        let ticketsSold = 0
        Object.keys( salesByType ).forEach( typeId => {
            const type = types.get( parseInt(typeId, 10) )
            if( !type ) {
                return
            }
            items.push({
                type: type.type,
                price: type.price,
                sold: salesByType[ typeId ] || 0,
                revenue: (revenueByType[ typeId ] || 0),
                comission: comissionsByType[ typeId ] || 0,
                paid: '-',
                toPay:'-'
            })

            revenue += (revenueByType[ typeId ] || 0)
            ticketsSold += (salesByType[ typeId ] || 0)
        })

        return(
            <div>
                <Table           
                    fields={[
                        { label: "TIPO", name: 'type' },
                        { label: "PRECIO", name: 'price', displayFormat: ( price) => <Currency currency="EUR" quantity={price}/> },
                        { label: "VENDIDAS", name: 'sold' },
                        { label: "RECAUDADO", name: 'revenue', displayFormat: ( reven ) => <Currency currency="EUR" quantity={reven}/> },
                        { label: "COMISIÓN", name: 'comission', displayFormat: ( com ) =>  <Currency currency="EUR" quantity={com}/> },
                        { label: 'PAGADO', name: 'paid' },
                        { label: 'A PAGAR', name:'toPay' }
                    ]}                             
                    items={items}
                    full
                    calculateTotals={( items ) => {
                        return {
                            type: 'TOTAL',
                            sold: ticketsSold,
                            revenue: (<Currency currency="EUR" quantity={revenue}/>),
                            comission: (<Currency currency="EUR" quantity={totalComission}/>),
                            paid: (<Currency currency="EUR" quantity={totalPaid}/>),
                            toPay: (<Currency currency="EUR" quantity={ revenue - totalComission - totalPaid}/>)
                        }
                    }}
                />
            </div>
        )
    }

    renderSales( sessionId ) {
        return(
            <div>
                <Segment secondary>
                    <h2 style={{textAlign: 'center'}}>VENTAS</h2>
                </Segment>
                <SalesFilters sessionId={sessionId} />
                <SalesTable />
            </div>
        )
    }

    renderPayments( sessionId ) {
        return(
            <div>
                <Segment secondary>
                    <h2 style={{textAlign: 'center'}}>PAGOS</h2>
                </Segment>
                <PaymentFilters sessionId={sessionId} />
                <NewPaymentButton sessionId={sessionId} />
                <PaymentsTable sessionId={sessionId} />
            </div>
        )
    }

    render() {
        const { imgsCached, sessionId, plane, zones, polygons, seats } = this.props
        if( !zones || !plane ) {
            return null
        }

        const SummaryList = this.renderSummaryList()
        const tabs = [
            {
                label:'VENDER ENTRADAS',
                content:(
                    <div>                        
                        {this.renderBuyDialog()}
                        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
                            <div>
                                <RecintRenderer
                                        plane={plane}
                                        zones={zones}
                                        polygons={polygons}
                                        rows={seats}
                                        lockSold
                                        showSeatState
                                        showOnlyPriced
                                        onSeatHover={ this.showSeatPrice.bind(this) }
                                        onSeatHoverExit={()=>this.setState({seatInfo:null})}
                                        onSeatClick={this.clickedSeat.bind(this)}
                                        seatsSelected={this.state.selectedSeats}
                                >
                                    {this.state.seatInfo}
                                </RecintRenderer>
                            </div>
                            <div>
                                <Button disabled={this.state.selectedSeats.length === 0} onClick={()=>this.deselectAll()} context="negative">DESELECCIONAR</Button>
                                <Button disabled={this.state.selectedSeats.length === 0 || !imgsCached} onClick={()=>this.setState({showBuyDialog:true})} context="possitive">COMPRAR</Button>
                            </div>                    
                        </div>
                        <div>
                            <Segment>
                                <Segment secondary>
                                    <h2 style={{textAlign: 'center'}}>RESUMEN</h2>
                                </Segment>
                                {SummaryList}
                            </Segment>
                        </div>
                    </div>
                )
            },
            {
                label:'LISTADO VENTAS',
                content:(
                    <div>
                        <div>
                            <Segment>
                                <Segment secondary>
                                    <h2 style={{textAlign: 'center'}}>RESUMEN</h2>
                                </Segment>
                                {SummaryList}
                            </Segment>
                        </div>
                        <div>
                            <Segment>
                                {this.renderSales( sessionId )}
                            </Segment>
                        </div>
                    </div>
                )
            },
            {
                label:'LISTADO PAGOS',
                content:(
                    <div>
                        <div>
                            <Segment>
                                <Segment secondary>
                                    <h2 style={{textAlign: 'center'}}>RESUMEN</h2>
                                </Segment>
                                {SummaryList}
                            </Segment>
                        </div>
                        {this.renderPayments( sessionId )}
                    </div>
                )
            }
        ]

        return(
            <div>
                <PrintTicket sessionId={sessionId} />
                <Tabs tabs={tabs} />
            </div>
        )
    }
}

export default connect(
    ( store ) => {
        const types = store.types.data
        const recintData = ExtractRecintDataFromStore( store )

        const companyCache = store.imgcache.cache.get( 'company_logo' )
        const headerCache = store.imgcache.cache.get( 'header_img' )
        const logosCache = store.imgcache.cache.get( 'logos_img' )

        const comissionsMap = store.comissions.data
        const comissionByUser = {}
        comissionsMap.forEach( comission => {
            let sessionComission = {}
            if( !comissionByUser[ comission.user_id ] ) {
                sessionComission[ comission.session_id ] = comission
                comissionByUser[ comission.user_id ] = sessionComission
            } else {
                sessionComission = comissionByUser[ comission.user_id ]
                sessionComission[ comission.session_id ] = comission
                comissionByUser[ comission.user_id ] = sessionComission
            }
        })
        
        const salesByType = {}
        const comissionsByType = {}
        const revenueByType = {}
        let totalComission = 0
        store.sales.data.forEach( sale => {
            if( sale.refund ) {
                return
            }
            const type = types.get( parseInt(sale.type_id, 10) )
            let comission = null
            if( type && comissionByUser[ sale.user_id ] ) {
                comission = comissionByUser[ sale.user_id ][ type.session_id ]
            }
            const realPrice = ApplyComission( type, comission )
            const currentComission = CalculateSellerComission( type, comission )

            if( !salesByType[ sale.type_id ] ) {
                salesByType[ sale.type_id ] = 1
            } else {
                salesByType[ sale.type_id ] += 1
            }
            if( !revenueByType[ sale.type_id ] ) {
                revenueByType[ sale.type_id ] = realPrice
            } else {
                revenueByType[ sale.type_id ] += realPrice
            }
            if( !comissionsByType[ sale.type_id ] ) {
                comissionsByType[ sale.type_id ] = parseFloat(currentComission)
            } else {
                comissionsByType[ sale.type_id ] += parseFloat(currentComission)
            }

            totalComission += parseFloat(currentComission)
        }) 

        let totalPaid = 0
        store.payments.data.forEach( payment => {
            totalPaid += parseFloat(payment.ammount)
        })      

        return {
            me: store.auth.me,
            types: store.types.data,
            zones: store.recintzones.data,
            polygons: recintData.polygons,
            seats: recintData.seats,
            seatprices: store.seatprices.data,
            seatreserves: store.seatreserves.data,
            toSelection: store.seatreserves.toSelection,
            toDeselect: store.seatreserves.toDeselect,
            comissionByUser,
            imgsCached: headerCache && logosCache && companyCache,
            salesByType,
            comissionsByType,
            revenueByType,
            totalComission,
            totalPaid
        }
    },
    ( dispatch ) => {
        return {
            fetchZones: bindActionCreators( ZoneActions.fetch, dispatch ),
            fetchPolygons: bindActionCreators( PolygonActions.fetch, dispatch ),
            fetchSeats: bindActionCreators( SeatActions.fetch, dispatch ),
            fetchReserves: bindActionCreators( ReservesActions.fetch, dispatch ),
            fetchSeatPrices: bindActionCreators( SeatPricesActions.fetch, dispatch ),
            fetchSales: bindActionCreators( SalesActions.fetch, dispatch ) ,
            fetchTypes: bindActionCreators( TypeActions.fetch, dispatch ),
            fetchComissions: bindActionCreators( ComissionActions.fetch, dispatch ),
            fetchPayments: bindActionCreators( PaymentActions.fetch, dispatch ),
            createReserve: bindActionCreators( ReservesActions.create, dispatch ),
            removeReserve: bindActionCreators( ReservesActions.delete, dispatch ),
            createSale: bindActionCreators( SalesActions.create, dispatch )
        }
    }
)(ZonedTicketOfficeController)