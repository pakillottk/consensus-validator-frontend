import Validator from './Validator'

import Required from './Rules/Required'
import MatchRegex from './Rules/MatchRegex'

export default new Validator({
    user_id: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ],
    type_id: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ],
    ammount: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ]
});