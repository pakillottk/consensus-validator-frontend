import React from 'react'

import Button from '../../ui/button/Button'
import { crud } from '../../../redux/actions/codes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import schema from './Schema'
import EntityFilters from '../EntityFilters'

class CodeFilters extends React.Component {
    constructor( props ) {
        super( props )

        this.codeFiltersComponent = EntityFilters( schema, props.fetch )
    }

    render() {
        const { sessionId } = this.props
        const CodeFiltersComponent = this.codeFiltersComponent

        return(
            <div>
                <CodeFiltersComponent
                    title="BUSCAR CÓDIGOS"
                    fetchBaseQuery={'session=' + sessionId}
                    hidden={{type: true, updated_at: true}}
                    selectors={{
                        out: {
                            toBoolean: '1'
                        },
                        type_id: true
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
})(CodeFilters)