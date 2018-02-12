import { Map } from 'immutable';

const builder = ( entity ) => {
    return ( state = { data: Map() }, action ) => {
        return state;
    }
};

export default builder;