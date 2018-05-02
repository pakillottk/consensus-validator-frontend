import Validator from './Validator'

import Required from './Rules/Required'
import MatchRegex from './Rules/MatchRegex'

export default new Validator({
    user_id: [
        new Required( true ),
        new MatchRegex( false, /[1-9]([0-9])*/ )
    ],
    distribution_cost: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ],
    comission: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ],
    apply_on: [
        new Required( true ),
        new MatchRegex( false, /base|total/ )
    ],
});