import Validator from './Validator'

import Required from './Rules/Required'
import FixedLength from './Rules/FixedLength'
import MatchRegex from './Rules/MatchRegex'
import ValidEmail from './Rules/ValidEmail'

export default new Validator({
    nif: [
        new Required(),
        new FixedLength( 9 )
    ],
    name: [
        new Required()
    ],
    address: [
        new Required()
    ],
    phone: [
        new Required(),
        new FixedLength( 9 ),
        new MatchRegex( /[0-9]{9}/ )
    ],
    email: [
        new Required(),
        new ValidEmail()
    ]
});