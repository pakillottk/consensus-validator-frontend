import Validator from './Validator'

import Required from './Rules/Required'
import MatchRegex from './Rules/MatchRegex'

export default new Validator({
    type_id: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ],
    group_id: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ]
});