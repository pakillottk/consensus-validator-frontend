import Validator from './Validator'

import Required from './Rules/Required'
import FixedLength from './Rules/FixedLength'
import MatchRegex from './Rules/MatchRegex'
import ValidEmail from './Rules/ValidEmail'

export default new Validator({
    nif: [
        new Required( true ),
        new FixedLength( false, 9 )
    ],
    name: [
        new Required( true )
    ],
    address: [
        new Required( true )
    ],
    phone: [
        new Required( true ),
        new FixedLength( false, 9 ),
        new MatchRegex( false, /[0-9]{9}/ )
    ],
    email: [
        new Required( true ),
        new ValidEmail()
    ],
    logo_url: [
        new Required( true )
    ]
});