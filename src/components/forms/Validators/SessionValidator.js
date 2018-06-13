import Validator from './Validator'

import Required from './Rules/Required'
import MatchRegex from './Rules/MatchRegex'

export default new Validator({
    name: [
        new Required( true )
    ],
    recint_id: [
        new Required( true ),
        new MatchRegex( false, /[0-9]+/ )
    ],
    date: [
        new Required( true )
    ],
    sellers_locked_at: [
        new Required( true )
    ],
    ticketoffice_closed_at: [
        new Required( true )
    ],
    logos_img: [
        new Required( true )
    ],
    header_img: [
        new Required( true )
    ]
});