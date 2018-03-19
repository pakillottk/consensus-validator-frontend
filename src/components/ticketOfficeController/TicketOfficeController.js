import React from 'react'

import Segment from '../ui/segment/Segment'
import Table from '../ui/table/Table'

import Form from '../ui/form/Form'
import Label from '../ui/form/Label/Label'
import Input from '../ui/form/Input/Input'
import TypeSelector from '../forms/Controls/TypeSelector/TypeSelector'
import Button from '../ui/button/Button'
import ConfirmModal from '../confirmModal/ConfirmModal'

import SalesTable from '../entitites/sales/SalesTable'

import PrintTicket from '../printTicket/PrintTicket'
import { crud as saleActions } from '../../redux/actions/sales'
import { crud as typeActions } from '../../redux/actions/types'
import { crud as deliverActions } from '../../redux/actions/deliveries'
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
        this.props.fetchTypes('?session='+sessionId )
        this.props.fetchDeliveries( '?session='+sessionId )
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
            const futureTotal = parseInt((salesByType[ typeId ] || 0 )) + parseInt(event.target.value)
            const left = deliverByType[ typeId ] - futureTotal
            if( parseInt(event.target.value) < 1 ||  left < 0 ) {
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
                this.props.createSale( data, '?session='+sessionId, {current: (i+1), total: parseInt(values.ammount)} )
            }
            this.setState({ errors: {}, values: {...this.inititalValues, type_id: this.state.values.type_id} })
        }

        this.switchConfirmSale( false )
    }

    renderSummaryList() {
        const { types, deliverByType, salesByType } = this.props
        const items = []
        let revenue = 0
        let ticketsSold = 0
        Object.keys( deliverByType ).forEach( typeId => {
            const type = types.get( parseInt(typeId) )
            if( !type ) {
                return
            }
            items.push({
                type: type.type,
                price: type.price,
                delivered: deliverByType[ typeId ],
                sold: salesByType[ typeId ] || 0,
                revenue: (salesByType[ typeId ] || 0) * type.price,
                left: deliverByType[ typeId ] - (salesByType[ typeId ] || 0 )
            })

            revenue += (salesByType[ typeId ] || 0) * type.price
            ticketsSold += (salesByType[ typeId ] || 0)
        })

        return(
            <div>
                <Table           
                    fields={[
                        { label: "TIPO", name: 'type' },
                        { label: "PRECIO", name: 'price', displayFormat: ( price) => price+"€" },
                        { label: "TOTAL", name: 'delivered' },
                        { label: "VENDIDAS", name: 'sold' },
                        { label: "QUEDAN", name: 'left' },
                        { label: "RECAUDADO", name: 'revenue', displayFormat: ( reven ) => reven+"€" },
                    ]}                             
                    items={items}
                    full
                />
                <Segment>
                    <h3 style={{textAlign: 'center'}}>TOTAL RECAUDADO: {revenue}€ / TOTAL VENDIDAS: {ticketsSold} </h3>
                </Segment>
            </div>
        )
    }

    getConfirmSaleMessage() {
        const { types } = this.props
        const { values } = this.state

        const type = types.get( parseInt(values.type_id) )
        if( !type ) {
            return;
        }

        return(
            <div style={{textAlign:'center'}}>
                <h3> {values.ammount} ENTRADAS DE {type.type} </h3>
                <h2> A PAGAR: {type.price * parseInt(values.ammount)}€ </h2>
                <p style={{color:'red'}}>
                    Una vez confirmada la venta, no se podrá anular ni eliminar. Asegúrese de 
                    recaudar el dinero antes de imprimir.
                </p>
            </div>
        )
    }

    render() {
        const { errors, values } = this.state
        const { sessionId, salesByType, deliverByType } = this.props
        const typeId = values.type_id
        
        return(
            <div>
                <PrintTicket sessionId={sessionId} />
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap'}}>
                    <Segment>
                        <Segment secondary>
                            <Segment>
                                <h2 style={{textAlign: 'center'}}>TAQUILLA</h2>
                            </Segment>
                            <Form onSubmit={this.handleSubmit.bind(this)}>
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

                                <Button disabled={ ( parseInt(salesByType[ typeId ] || 0) + parseInt(values.ammount) > parseInt(deliverByType[ typeId ]) ) || typeId <= 0 } context="possitive" type="submit">VENDER</Button>
                            </Form>
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
                
                <Segment secondary>
                    <h2 style={{textAlign: 'center'}}>VENTAS</h2>
                </Segment>
                <SalesTable />
            </div>
        )
    }
}
export default connect(
    ( store ) => {        
        const deliverByType = {}
        store.deliveries.data.forEach( delivery => {
            if( !deliverByType[ delivery.type_id ] ) {
                deliverByType[ delivery.type_id ] = delivery.ammount
            } else {
                deliverByType[ delivery.type_id ] += delivery.ammount
            }
        })

        const salesByType = {}
        store.sales.data.forEach( sale => {
            if( !salesByType[ sale.type_id ] ) {
                salesByType[ sale.type_id ] = 1
            } else {
                salesByType[ sale.type_id ] += 1
            }
        }) 
        
        return {
            me: store.auth.me,
            types: store.types.data,
            deliverByType,
            salesByType
        }
    },
    ( dispatch ) => {
        return {
            fetchSession: bindActionCreators( sessionActions.fetchById, dispatch ),
            fetchTypes: bindActionCreators( typeActions.fetch, dispatch ),
            fetchDeliveries: bindActionCreators( deliverActions.fetch, dispatch ),
            fetchSales: bindActionCreators( saleActions.fetch, dispatch ),
            createSale: bindActionCreators( saleActions.create, dispatch )
        }
    } 
)(TicketOfficeController);