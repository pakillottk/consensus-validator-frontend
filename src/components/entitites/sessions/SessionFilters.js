import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/sessions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityFilters from '../EntityFilters'
import moment from 'moment'

const modifiedSchema = [
    ...schema,
    {
        name: 'from_date',
        label: 'DESDE',
        type:'input',
        component:'datetime-local'
    },
    {
        name: 'to_date',
        label: 'HASTA',
        defaultValue: new Date(),
        type:'input',
        component:'datetime-local',
        inputFormat: ( date ) => {
            return moment( date ).format( 'YYYY-MM-DDThh:mm' )
        }
    }
]

class SessionFilters extends React.Component {
    constructor( props ) {
        super( props )

        this.sessionFilterComponent = EntityFilters( modifiedSchema, props.fetch )
    }

    render() {
        const SessionFilterComponent = this.sessionFilterComponent
        return(
            <div>
                <SessionFilterComponent
                    title="BUSCAR SESIÓN"
                    fetchBaseQuery={''}
                    hidden={{date: true}}
                    selectors={{}}
                />
            </div>
        )
    }
}
export default connect( () => { return {} }, ( dispatch ) => {
    return {
        fetch: bindActionCreators( crud.fetch, dispatch )
    }
})(SessionFilters)