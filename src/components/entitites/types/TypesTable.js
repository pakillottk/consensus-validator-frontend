import React from 'react'

import { crud } from '../../../redux/actions/types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityTable from '../EntityTable'
import TypeForm from './TypeForm'

import Currency from 'react-currency-formatter'

class TypesTable extends React.Component {
    componentWillMount() {
        const { sessionId } = this.props
        this.props.fetch( '?session=' + sessionId )
    }

    calculateTotals( items ) {
        let totalPrice = 0
        let totalAmmount = 0
        items.forEach( type => {
            totalPrice += parseFloat( type.price )
            totalAmmount += parseInt( type.ammount, 10 )
        })

        return {
            type:'TOTAL',
            price: (<Currency currency='EUR' quantity={totalPrice/items.size}/>),
            ammount: totalAmmount 
        }
    }

    render() {
        const { types } = this.props
        return(
            <EntityTable
                schema={schema}
                items={types}
                hidden={{session_id: true}}
                formTitle="EDITAR TIPO"
                Form={TypeForm}
                calculateTotals={this.calculateTotals.bind(this)}
                full
            />
        )
    }
} 

export default connect(
    ( store ) => {
        return {
            types: store.types.data
        }
    },
    ( dispatch ) => {
        return {
            fetch: bindActionCreators( crud.fetch, dispatch )
        }
    }
)(TypesTable)