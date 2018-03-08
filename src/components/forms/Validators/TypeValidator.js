import Validator from './Validator'

import Required from './Rules/Required'
import MatchRegex from './Rules/MatchRegex'

export default new Validator({
    type: [
        new Required( true )
    ],
    price: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ],
    session_id: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ]
});