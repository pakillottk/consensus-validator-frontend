import React from 'react'

import NewEntityButton from '../NewEntityButton'
import CompanyForm from './CompanyForm'

export default class NewCompanyButton extends React.Component {
    render() {
        return(
            <NewEntityButton title="NUEVA COMPAÑÍA" Form={CompanyForm} full styles={{margin: 0}}/>
        )
    }
}