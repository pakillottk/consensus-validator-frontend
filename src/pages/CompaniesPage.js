import React from 'react'

import Segment from '../components/ui/segment/Segment'
import CompaniesTable from '../components/entitites/companies/CompaniesTable'

export default class CompaniesPage extends React.Component {
    render()  {
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">COMPAÑÍAS</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    <CompaniesTable />
                </Segment>
            </div>
        )
    }
}