import React from 'react';

import Segment from '../components/ui/segment/Segment'
import RecintsFilters from '../components/entitites/recints/RecintsFilters'
import RecintsTable from '../components/entitites/recints/RecintsTable'
import NewRecintButton from '../components/entitites/recints/NewRecintButton'

export default class RecintsPage extends React.Component {
    goToRecintPage( recint ) {
        this.props.history.push( '/recintos/' + recint.id )
    }

    render() {
        return(
            <div>
                <Segment secondary styles={{border:'none'}}>
                    <h1 className="center-aligned">RECINTOS</h1>
                </Segment>
                <Segment styles={{padding: 0}}>
                    <RecintsFilters />
                    <NewRecintButton styles={{margin: 'none'}} full />
                    <RecintsTable onItemClick={ ( item ) => this.goToRecintPage( item ) }/>
                </Segment>
            </div>
        );
    }
}