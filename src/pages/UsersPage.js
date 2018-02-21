import React from 'react'

import Segment from '../components/ui/segment/Segment'
import UsersTable from '../components/entitites/users/UsersTable'

export default class UsersPage extends React.Component {
    render()  {
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">USUARIOS</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    <UsersTable />
                </Segment>
            </div>
        )
    }
}