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
import { crud as DeliverActions } from '../../redux/actions/deliveries'

import SetFuncs from '../../utils/SetFuncs'
import BuildZoneTables from '../../entities/SeatPrices/BuildZoneTables'
import BuildSalesTables from '../../entities/SeatPrices/BuildSalesTables'
import ExtractRecintDataFromStore from '../../entities/Recints/ExtractRecintDataFromStore'
import CountSeatsByType from '../../entities/SeatPrices/CountSeatsByType'
import ApplyComission from '../../entities/comissions/ApplyComission'
import CalculateSellerComission from '../../entities/comissions/CalculateSellerComission'
import moment from 'moment'

import io from 'socket.io-client'
import SocketConnection from '../../API/SocketConnection'

class ZonedTicketOfficeController extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            seatInfo: null,
            selectedSeats: [],
            showBuyDialog: false,
            showNoNumBuyDialog: false,
            selectedPrice: -1,
            name: '',
            selectedNoNumerated: -1,
            noNumeratedName:'',
            ammount:1
        }
    }
    componentWillMount() {
        const { 
            me,
            sessionId, 
            fetchZones, 
            fetchPolygons, 
            fetchSeats, 
            fetchReserves, 
            fetchSeatPrices,
            fetchSales,
            fetchTypes,
            fetchComissions,
            fetchPayments,
            fetchDeliveries
        } = this.props

        fetchZones( '?session='+sessionId )
        fetchPolygons( '?session='+sessionId )
        fetchSeats( '?session='+sessionId )
        fetchReserves( '?session='+sessionId )
        fetchSeatPrices( '?session='+sessionId )
        fetchSales( '?session='+sessionId )
        fetchTypes( '?session='+sessionId )
        fetchDeliveries( '?session='+sessionId )
        fetchComissions( '?session='+sessionId )
        fetchPayments( '?session='+sessionId )

        this.setState({selectedSeats:[], seatInfo: null})

        this.io = io( SocketConnection.basePath() )
        this.io.emit( 'join', {room: sessionId + '-session'} )
        this.io.on( 'seatreserve_created', ( data ) => {
            if( data.user_id !== me.user_id ) {
                this.props.createReserveLocal( data )
            }
        })

        this.io.on( 'seatreserve_updated', ( data ) => {
            if( data.user_id !== me.user_id ) {
                this.props.updateReserveLocal( data.id, data )
            }
        })

        this.io.on( 'seatreserve_deleted', ( data ) => {
            if( data.user_id !== me.user_id ) {
                this.props.removeReserveLocal( data.id );
            }
        })

        this.io.on( 'sale_added', ( data ) => {
            this.props.createSaleLocal( data )
        })
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

    componentWillUnmount() {
        this.io.disconnect()
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

    extractTypesIds( seatPrices ) {
        const ids = []
        seatPrices.forEach( price => {
            ids.push( price.id )
        }) 

        return ids
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

        //if seats selected, ensure that share types
        if( this.state.selectedSeats.length > 0 ) {
            const commonTypes = SetFuncs.intersect(
                this.extractTypesIds( this.state.selectedSeats[0].seatPrice ),
                this.extractTypesIds( seatPrice )
            )
            //if no common types, ignore click
            if( commonTypes.length === 0 ) {
                return
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

    buyNoNumerated() {
        const { me, noNumerated, createSale } = this.props
        const { selectedNoNumerated, noNumeratedName, ammount } = this.state
        
        const price = noNumerated.get( parseInt( selectedNoNumerated, 10 ) );
        if( !price ) {
            return;
        }
        for( let i = 0; i < ammount; i++ ) {
            createSale(
                {
                    type_id: price.type.id,
                    zone_id: price.zone_id,
                    user_id: me.id,
                    name: noNumeratedName !== '' ? noNumeratedName : me.username
                },
                '',
                {current: (i+1), total: parseInt(ammount, 10)}
            );
        }

        this.setState({selectedNoNumerated:-1, noNumeratedName:'', ammount: 1, showNoNumBuyDialog:false})
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

    getSelectionCommonPrices() {
        let prices = []
        if( this.state.selectedSeats.length === 0 ) {
            return []
        } else if ( this.state.selectedSeats.length === 1 ) {
            prices = this.state.selectedSeats[0].seatPrice
        } else {
            //get intersection between all selected seats
            let validIds = this.extractTypesIds( this.state.selectedSeats[ 0 ].seatPrice )
            for( let i = 1; i < this.state.selectedSeats.length; i++ ) {
                validIds = SetFuncs.intersect( 
                    validIds, 
                    this.extractTypesIds( this.state.selectedSeats[i].seatPrice ) 
                )
            }

            validIds.forEach( id =>  {
                prices.push( this.props.types.get( parseInt( id, 10 ) ) )
            })
        }

        return prices
    }

    renderPriceSelect( prices ) {
        if( !prices ) {
            return null
        }
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

    renderBuyDialogNoNum() {
        const { noNumerated, comissionByUser, me } = this.props
        const price = noNumerated.get( parseInt( this.state.selectedNoNumerated, 10 ) )
        if( !price ) {
            return null
        }

        const sellPrice = ApplyComission( price.type, comissionByUser[ me.id ] )
        return(
            <ConfirmModal
                open={this.state.showNoNumBuyDialog}
                title={'COMPRAR ENTRADAS'}
                message=''
                onConfirm={()=>{
                    this.buyNoNumerated()
                }}
                onCancel={()=>{
                    this.setState({selectedNoNumerated:-1, noNumeratedName:'', ammount: 1, showNoNumBuyDialog:false})
                }}
            >
                <div>
                    <h3 style={{color:'red'}}> 
                        Una vez confirmada la venta, no se podrá deshacer/eliminar.
                        Asegúrese de recaudar el importe antes de confirmar. 
                    </h3>
                    <div style={{textAlign:'center'}}>
                        <h4>
                            {this.state.ammount} ENTRADAS DE {price.type.type}
                        </h4>
                        <h3>
                            TOTAL A PAGAR:  
                            <span style={{color:'red'}}>
                                <Currency
                                    currency='EUR'
                                    quantity={ sellPrice * parseInt( this.state.ammount, 10 ) }
                                />
                            </span>
                        </h3>
                    </div>
                </div>
            </ConfirmModal>
        )
    }

    renderBuyDialog() {
        let singlePrice = false
        let commonPrices = this.getSelectionCommonPrices()
        if( this.state.showBuyDialog && commonPrices.length === 1 ) {
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
                        {this.renderPriceSelect(commonPrices)}
                    </div>}
                    {commonPrices.length > 0 && this.state.selectedPrice >= 0 && 
                        <div style={{textAlign:'center'}}>
                            <h4>
                                {this.state.selectedSeats.length} ENTRADAS DE {commonPrices[this.state.selectedPrice].type}
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

    renderSummaryByZones() {
        const { zones, salesByZone, seatsByZone } = this.props
        const items = []
        const totals = {
            zone: 0,
            seats: 0,
            sold: 0,
            left: 0
        }
        zones.forEach( zone => {
            items.push({
                zone: zone.zone,
                seats: seatsByZone[ zone.id ] || 0,
                sold: salesByZone[ zone.id ] || 0,
                left: ( seatsByZone[ zone.id ] || 0 ) - ( salesByZone[ zone.id ] || 0 )
            })

            totals.zone++;
            totals.seats += seatsByZone[ zone.id ] || 0
            totals.sold += salesByZone[ zone.id ] || 0
            totals.left += ( seatsByZone[ zone.id ] || 0 ) - ( salesByZone[ zone.id ] || 0 )
        })

        return(
            <div>
                <Table           
                    fields={[
                        { label: "ZONA", name: 'zone' },
                        { label: "DISPONIBLES", name: 'seats' },
                        { label: "VENDIDOS", name: 'sold' },
                        { label: "QUEDAN", name: 'left' },
                    ]}                             
                    items={items}
                    full
                    calculateTotals={(items) => {
                        return totals
                    }}
                />
            </div>
        )

    }

    renderSummaryList() {
        const { types, seatsByType, totalPaid, salesByType, revenueByType, comissionsByType, totalComission } = this.props
        const items = []
        let revenue = 0
        let ticketsSold = 0
        let totalAmmount = 0
        Object.keys( salesByType ).forEach( typeId => {
            const type = types.get( parseInt(typeId, 10) )
            if( !type ) {
                return
            }
            items.push({
                type: type.type,
                ammount: seatsByType[ type.id ],
                left: seatsByType[ type.id ] - (salesByType[ typeId ] || 0),
                price: type.price,
                sold: salesByType[ typeId ] || 0,
                revenue: (revenueByType[ typeId ] || 0),
                comission: comissionsByType[ typeId ] || 0,
                paid: '-',
                toPay:'-'
            })
            totalAmmount += seatsByType[ type.id ] || 0
            revenue += (revenueByType[ typeId ] || 0)
            ticketsSold += (salesByType[ typeId ] || 0)
        })

        return(
            <div>
                <Table           
                    fields={[
                        { label: "TIPO", name: 'type' },
                        { label: "PRECIO", name: 'price', displayFormat: ( price) => <Currency currency="EUR" quantity={price}/> },
                        { label: "A LA VENTA", name: 'ammount' },
                        { label: "QUEDAN", name: 'left' },
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
                            ammount: totalAmmount,
                            left: totalAmmount - ticketsSold,
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

    renderNoNumeratedSelector() {
        const priceOptions = [] 
        this.props.noNumerated.forEach( (price, index) => {
            priceOptions.push({
                text: price.zone.zone + ' - ' + price.type.type + '(' + price.type.price + '€)',
                value: index
            })
        })
        priceOptions.unshift({text:'SELECCIONE', value: -1})

        return (
            <Select
                options={priceOptions}
                value={this.state.selectedNoNumerated}
                onChange={(e)=>this.setState({selectedNoNumerated:e.target.value})}
            />
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
                        {this.renderBuyDialogNoNum()}
                        <div>
                            <Segment>
                                <Segment secondary>
                                    <h2 style={{textAlign: 'center'}}>RESUMEN LOCALIDADES</h2>
                                </Segment>
                                {this.renderSummaryByZones()}
                            </Segment>
                        </div>
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
                                {this.props.noNumerated.size > 0 && <div>
                                    <Segment secondary>
                                        <h3 style={{textAlign:'center'}}>VENTA NO NUMERADA</h3>
                                        <Label>TIPO</Label>
                                        {this.renderNoNumeratedSelector()}
                                        <Label>NOMBRE</Label>
                                        <Input value={this.state.noNumeratedName} onChange={(e)=>this.setState({noNumeratedName:e.target.value})}/>
                                        <Label>CANTIDAD</Label>
                                        <Input type='number' value={this.state.ammount} onChange={(e)=>this.setState({ammount:e.target.value})}/>
                                        <Button onClick={()=>this.setState({showNoNumBuyDialog:true})} disabled={this.state.selectedNoNumerated === -1} context='possitive'>VENDER</Button>
                                    </Segment>
                                </div>}
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

        const seatsByType = {};
        types.forEach( type => {
            seatsByType[ type.id ] = CountSeatsByType( store.seatrows.data, store.seatprices.data.filter( price => price.numerated ) , type.id );
        })
        
        
        const zoneTables = BuildZoneTables( store.seatrows.data, store.seatprices.data );
        const seatsByZone = {}
        Object.keys( zoneTables ).forEach( zoneId => {
            const zoneSeats = zoneTables[ zoneId ];
            if( seatsByZone[ zoneId ] === undefined ) {
                seatsByZone[ zoneId ] = 0;
            }
            for( let i = 0; i < zoneSeats.length; i++ ) {
                for( let j = 0; j < zoneSeats[i].length; j++ ) {
                    if( zoneSeats[i][j].length > 0 ) {
                        seatsByZone[ zoneId ]++;
                    }
                }
            }
        })
        
        const noNumeratePrices = store.seatprices.data.filter( price => !price.numerated )
        const noNumeratedTypes = {} 
        noNumeratePrices.forEach( price => {
            seatsByType[ price.type_id ] += price.type.ammount
            seatsByZone[ price.zone_id ] += price.type.ammount

            if( !noNumeratedTypes[ price.type_id ] ) {
                noNumeratedTypes[ price.type_id ] = [ price.zone_id ]
            } else {
                noNumeratedTypes[ price.type_id ].push( price.zone_id )
            }
        })

        const salesTables = BuildSalesTables( store.seatrows.data, store.sales.data );
        const salesByZone = {}
        Object.keys( salesTables ).forEach( zoneId => {
            const zoneSeats = salesTables[ zoneId ];
            if( salesByZone[ zoneId ] === undefined ) {
                salesByZone[ zoneId ] = 0;
            }
            for( let i = 0; i < zoneSeats.length; i++ ) {
                for( let j = 0; j < zoneSeats[i].length; j++ ) {
                    if( zoneSeats[i][j] !== null ) {
                        salesByZone[ zoneId ]++;
                    }
                }
            }
        })

        const noNumeratedSales = store.sales.data.filter( sale => noNumeratedTypes[ sale.code.type_id ] ? noNumeratedTypes[ sale.code.type_id ].includes( sale.code.zone_id ) : false )
        noNumeratedSales.forEach( sale => {
            if( !salesByZone[ sale.code.zone_id ] ) {
                salesByZone[ sale.code.zone_id ] = 1
            } else {
                salesByZone[ sale.code.zone_id ]++
            }
        })

        const deliverByType = {}
        store.deliveries.data.forEach( delivery => {
            if( !deliverByType[ delivery.type_id ] ) {
                deliverByType[ delivery.type_id ] = delivery.ammount
            } else {
                deliverByType[ delivery.type_id ] += delivery.ammount
            }
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
            totalPaid,
            seatsByType,
            seatsByZone,
            salesByZone,
            deliverByType,
            noNumerated: store.seatprices.data.filter( price => !price.numerated )
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
            fetchDeliveries: bindActionCreators( DeliverActions.fetch, dispatch ),
            createReserve: bindActionCreators( ReservesActions.create, dispatch ),
            removeReserve: bindActionCreators( ReservesActions.delete, dispatch ),
            createReserveLocal: bindActionCreators( ReservesActions.create_local, dispatch ),
            updateReserveLocal: bindActionCreators( ReservesActions.update_local, dispatch ),
            removeReserveLocal: bindActionCreators( ReservesActions.delete_local, dispatch ),
            createSale: bindActionCreators( SalesActions.create, dispatch ),
            createSaleLocal: bindActionCreators( SalesActions.create_local, dispatch )
        }
    }
)(ZonedTicketOfficeController)