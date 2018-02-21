import React from 'react'

import Segment from '../components/ui/segment/Segment'
import UsersTable from '../components/entitites/users/UsersTable'
import NewUserButton from '../components/entitites/users/NewUserButton'

export default class UsersPage extends React.Component {
    render()  {
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">USUARIOS</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    <NewUserButton styles={{margin: 'none'}} full />
                    <UsersTable />
                </Segment>
            </div>
        )
    }
}