import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/logentries'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityFilters from '../EntityFilters'
import moment from 'moment'

const filterFormSchema = [
    ...schema,
    {
        name: 'from_date',
        label: 'DESDE',
        type: 'input',
        component: 'datetime-local',
        inputFormat: ( date ) => {
            return moment( date ).format( 'YYYY-MM-DDThh:mm' )
        }
    },
    {
        name: 'to_date',
        label: 'HASTA',
        type: 'input',
        defaulValue: new Date(),
        component: 'datetime-local',
        inputFormat: ( date ) => {
            return moment( date ).format( 'YYYY-MM-DDThh:mm' )
        }
    }
]

class LogEntriesFilters extends React.Component {
    constructor( props ) {
        super( props )

        this.filterComponent = EntityFilters( filterFormSchema, props.fetch )
    }

    render() {
        const { sessionId } = this.props
        const LogEntriesFiltersComponent = this.filterComponent
        return(
            <div>
                <LogEntriesFiltersComponent
                    title="FILTRAR"
                    fetchBaseQuery={'session=' + sessionId}
                    hidden={{date: true, username: true}}
                    selectors={{
                        user_id: true,
                        level: true
                    }}
                />
            </div>
        )
    }
}
export default connect( () => { return {} }, ( dispatch ) => {
    return {
        fetch: bindActionCreators( crud.fetch, dispatch )
    }
})(LogEntriesFilters)