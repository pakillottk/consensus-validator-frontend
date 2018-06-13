import EntityReducer from './generators/EntityReducer'
import API from '../../API/API'

//Make imgs available in browser cache for better speed
const preprocessor = ( data ) => {
    if( data.header_img ) {
        (new Image()).src = API.getFullPath(data.header_img);
    }
    if( data.logos_img ) {
        (new Image()).src = API.getFullPath(data.logos_img);
    }
    if( data.recint ) {
        data.location = data.recint.location + ( data.recint.address ? ` (${data.recint.address})` : "" );
        data.recint = data.recint.recint;
    }
    return data;
}

export default EntityReducer( 'Sessions', {}, preprocessor );