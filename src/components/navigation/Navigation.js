import React from 'react'

import navItems from './NavPaths'
import { Link } from 'react-router-dom'
import List from '../ui/list/List'

export default class Navigation extends React.Component {
    renderLink( pathData ) {
        return( 
            <Link 
                style={{ color: 'black', textDecoration: 'none' }}
                className='pointer hovered-transparency' 
                to={pathData.path}
            >
                {pathData.label}
            </Link>
        )
    }

    render() {
        return(
            <List
                items={navItems}
                renderItem={ ( item ) => this.renderLink( item ) }            
            />
        )
    }
}