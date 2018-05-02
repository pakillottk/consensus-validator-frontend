import Validator from './Validator'

import Required from './Rules/Required'
import MatchRegex from './Rules/MatchRegex'

export default new Validator({
    ammount: [
        new Required( true ),
        new MatchRegex( false, /[1-9]([0-9])*/ )
    ],
    pay_form: [
        new Required( true ),
        new MatchRegex( false, /cash|check|transfer/ )
    ],
    paid_to: [
        new Required( true )
    ]
});