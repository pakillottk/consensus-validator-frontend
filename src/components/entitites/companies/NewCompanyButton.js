import React from 'react'

import NewEntityButton from '../NewEntityButton'
import CompanyForm from './CompanyForm'

export default class NewCompanyButton extends React.Component {
    createWindow() {
        this.props.create( 'NUEVA COMPAÑÍA', (<div> <CompanyForm /> </div>) )
    }

    render() {
        return(
            <NewEntityButton title="NUEVA COMPAÑÍA" Form={CompanyForm} full styles={{margin: 0}}/>
        )
    }
}