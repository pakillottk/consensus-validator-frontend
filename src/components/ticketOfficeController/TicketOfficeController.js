import React from 'react'

import Segment from '../ui/segment/Segment'
import Table from '../ui/table/Table'
import Tabs from '../ui/tabs/Tabs'

import Form from '../ui/form/Form'
import Label from '../ui/form/Label/Label'
import Input from '../ui/form/Input/Input'
import TypeSelector from '../forms/Controls/TypeSelector/TypeSelector'
import Button from '../ui/button/Button'
import ConfirmModal from '../confirmModal/ConfirmModal'
import Currency from 'react-currency-formatter'

import ApplyComission from '../../entities/comissions/ApplyComission'
import CalculateSellerComission from '../../entities/comissions/CalculateSellerComission'

import SalesFilters from '../entitites/sales/SalesFilters'
import SalesTable from '../entitites/sales/SalesTable'

import PaymentFilters from '../entitites/payments/PaymentFilters'
import NewPaymentButton from '../entitites/payments/NewPaymentButton'
import PaymentsTable from '../entitites/payments/PaymentsTable'

import PrintTicket from '../printTicket/PrintTicket'
import { crud as saleActions } from '../../redux/actions/sales'
import { crud as typeActions } from '../../redux/actions/types'
import { crud as comissionActions } from '../../redux/actions/comissions'
import { crud as deliverActions } from '../../redux/actions/deliveries'
import { crud as paymentActions } from '../../redux/actions/payments'
import { crud as sessionActions } from '../../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class TicketOfficeController extends React.Component {
    constructor( props ) {
        super( props )

        this.inititalValues = {
            name: props.me.username,
            email: props.me.email || undefined,
            type_id: 0,
            ammount: 1
        }

        this.state = {
            values: {...this.inititalValues},
            errors: {},
            openConfirmSale: false
        }

        this.handleFieldChange = this.handleFieldChange.bind( this )
    }

    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetchSession( sessionId )
        this.props.fetchTypes( '?session='+sessionId )
        this.props.fetchComissions( '?session='+sessionId )
        this.props.fetchDeliveries( '?session='+sessionId )
        this.props.fetchPayments( '?session='+sessionId )
        this.props.fetchSales('?session='+sessionId )
    }

    switchConfirmSale( value ) {
        this.setState({openConfirmSale: value})
    }

    handleFieldChange( event ) {
        const values = {...this.state.values};
        if( event.target.name === 'ammount' ) {
            const { deliverByType, salesByType } = this.props
            const typeId = this.state.values.type_id
            const futureTotal = parseInt((salesByType[ typeId ] || 0 ), 10) + parseInt(event.target.value, 10)
            const left = deliverByType[ typeId ] - futureTotal
            if( parseInt(event.target.value, 10) < 1 ||  left < 0 ) {
                return
            }
        }
        values[ event.target.name ] = event.target.value;

        this.setState({ values });
    }

    handleSubmit( event ) {
        event.preventDefault()
        this.switchConfirmSale( true )
    }

    sellTickets() {
        const { sessionId } = this.props
        const { values } = this.state
        const errors = {}
        if( values.ammount <= 0 ) {
            errors[ "CANTIDAD" ] = "Debe ser mayor que 0."
        }
        if( values.type_id <= 0 ) {
            errors[ "TIPO" ] = "Seleccione un tipo"
        }
        if( Object.keys( errors ).length > 0 ) {
            this.setState({errors})
        } else {
            const data = {...values}
            delete data.ammount
            for( let i = 0; i < values.ammount; i++ ) {
                this.props.createSale( data, '?session='+sessionId, {current: (i+1), total: parseInt(values.ammount, 10)} )
            }
            this.setState({ errors: {}, values: {...this.inititalValues, type_id: this.state.values.type_id} })
        }

        this.switchConfirmSale( false )
    }

    renderSummaryList() {
        const { types, deliverByType, salesByType, revenueByType, comissionsByType, totalComission, totalPaid } = this.props
        const items = []
        let revenue = 0
        let ticketsSold = 0
        let totalDelivered = 0
        let totalLeft = 0
        Object.keys( deliverByType ).forEach( typeId => {
            const type = types.get( parseInt(typeId, 10) )
            if( !type ) {
                return
            }
            items.push({
                type: type.type,
                price: type.price,
                delivered: deliverByType[ typeId ],
                sold: salesByType[ typeId ] || 0,
                revenue: (revenueByType[ typeId ] || 0),
                comission: comissionsByType[ typeId ] || 0,
                left: deliverByType[ typeId ] - (salesByType[ typeId ] || 0 ),
                paid: '-',
                toPay: '-'
            })

            totalDelivered += deliverByType[ typeId ]
            totalLeft += deliverByType[ typeId ] - (salesByType[ typeId ] || 0 )
            revenue += (revenueByType[ typeId ] || 0)
            ticketsSold += (salesByType[ typeId ] || 0)
        })

        return(
            <div>
                <Table           
                    fields={[
                        { label: "TIPO", name: 'type' },
                        { label: "PRECIO", name: 'price', displayFormat: ( price) => <Currency currency="EUR" quantity={price}/> },
                        { label: "TOTAL", name: 'delivered' },
                        { label: "VENDIDAS", name: 'sold' },
                        { label: "QUEDAN", name: 'left' },
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
                            delivered: totalDelivered,
                            left: totalLeft,
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

    getConfirmSaleMessage() {
        const { types, comissionByUser, me } = this.props
        const { values } = this.state

        const type = types.get( parseInt(values.type_id, 10) )
        if( !type ) {
            return;
        }

        let realPrice = type.price
        if( comissionByUser[ me.id ] ) {
            realPrice = ApplyComission( type, comissionByUser[ me.id ][ type.session_id ] )
        }
        return(
            <div style={{textAlign:'center'}}>
                <h3> {values.ammount} ENTRADAS DE {type.type} </h3>
                <h2> A PAGAR: <Currency currency='EUR' quantity={realPrice * parseInt(values.ammount, 10)} /> </h2>
                <p style={{color:'red'}}>
                    Una vez confirmada la venta, no se podrá anular ni eliminar. Asegúrese de 
                    recaudar el dinero antes de imprimir.
                </p>
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
        const { errors, values } = this.state
        const { me, sessionId, refunds, salesByType, deliverByType } = this.props
        const typeId = values.type_id

        if( Object.keys( deliverByType ).length === 0 && me.role !== 'superadmin' && me.role !== 'admin' ) {
            return(
                <Segment secondary styles={{position: 'relative', fontSize: '2rem', overflow: 'hidden', height: '93vh', textAlign:'center'}}>
                    <h1 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'red'}}> NO TIENE ENTRADAS DE ESTA SESIÓN. </h1>
                </Segment>
            )
        }

        const sellAmmountAllowed = ( parseInt((salesByType[ typeId ] || 0), 10) + parseInt(values.ammount, 10) > parseInt(deliverByType[ typeId ], 10) ) || typeId <= 0
        return(
            <div>
                <PrintTicket sessionId={sessionId} />
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap'}}>
                    <Segment>
                        <Segment secondary>
                            <Segment>
                                <h2 style={{textAlign: 'center'}}>TAQUILLA</h2>
                            </Segment>
                            {!refunds && <Form onSubmit={this.handleSubmit.bind(this)}>
                                <div style={{color:'red'}}>
                                    { Object.keys( errors ).map( ( key, index ) => <p key={index}>{key}: {errors[key]} </p> ) }
                                </div>

                                <Label>NOMBRE</Label>
                                <Input type="text" name="name" value={this.state.values.name} onChange={this.handleFieldChange} />
                                <Label>EMAIL</Label>
                                <Input type="text" name="email" value={this.state.values.email} onChange={this.handleFieldChange} />
                                <Label>TIPO</Label>
                                <TypeSelector name="type_id" value={this.state.values.type_id} onChange={this.handleFieldChange} />
                                <Label>CANTIDAD</Label>
                                <Input styles={{textAlign:'right'}} type="number" name="ammount" value={this.state.values.ammount} onChange={this.handleFieldChange}/>

                                <Button disabled={ sellAmmountAllowed || !this.props.imgsCached } context="possitive" type="submit">VENDER</Button>
                            </Form>}
                            {refunds && <h2>VENTAS DESACTIVADAS.</h2>}
                            <ConfirmModal
                                open={this.state.openConfirmSale}
                                onConfirm={() => this.sellTickets()}
                                onCancel={() => this.switchConfirmSale(false)}
                                title="¿CONFIRMAR VENTA?"
                                message={this.getConfirmSaleMessage()}
                            />
                        </Segment>
                    </Segment>
                    <Segment>
                        <Segment secondary>
                            <h2 style={{textAlign: 'center'}}>RESUMEN</h2>
                        </Segment>
                        {this.renderSummaryList()}
                    </Segment>
                </div>
                
                <Tabs
                    tabs={[
                        {label:'VENTAS', content:this.renderSales( sessionId )},
                        {label:'PAGOS', content:this.renderPayments( sessionId )},
                    ]}
                />
            </div>
        )
    }
}
export default connect(
    ( store, props ) => {  
        const types = store.types.data

        const deliverByType = {}
        store.deliveries.data.forEach( delivery => {
            if( !deliverByType[ delivery.type_id ] ) {
                deliverByType[ delivery.type_id ] = delivery.ammount
            } else {
                deliverByType[ delivery.type_id ] += delivery.ammount
            }
        })

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
        
        const session = store.sessions.data.get( parseInt( props.sessionId, 10) )
        const companyCache = store.imgcache.cache.get( 'company_logo' )
        const headerCache = store.imgcache.cache.get( 'header_img' )
        const logosCache = store.imgcache.cache.get( 'logos_img' )
        let refunds = false
        if( session ) {
            refunds = session.refund_mode
        }
        return {
            me: store.auth.me,
            refunds,
            types,
            deliverByType,
            salesByType,
            comissionsByType,
            totalComission,
            revenueByType,
            comissionByUser,
            totalPaid,
            imgsCached: headerCache && logosCache && companyCache
        }
    },
    ( dispatch ) => {
        return {
            fetchSession: bindActionCreators( sessionActions.fetchById, dispatch ),
            fetchTypes: bindActionCreators( typeActions.fetch, dispatch ),
            fetchDeliveries: bindActionCreators( deliverActions.fetch, dispatch ),
            fetchComissions: bindActionCreators( comissionActions.fetch, dispatch ),
            fetchPayments: bindActionCreators( paymentActions.fetch, dispatch ),
            fetchSales: bindActionCreators( saleActions.fetch, dispatch ),
            createSale: bindActionCreators( saleActions.create, dispatch )
        }
    } 
)(TicketOfficeController);