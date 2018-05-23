import Validator from './Validator'

import Required from './Rules/Required'
import MatchRegex from './Rules/MatchRegex'

export default new Validator({
    username: [
        new Required( true )
    ],
    password: [
        new Required( true )
    ],
    role_id: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ],
    company_id: [
        new MatchRegex( false, /[0-9]+/ )
    ]
});