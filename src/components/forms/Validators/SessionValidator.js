import Validator from './Validator'

import Required from './Rules/Required'

export default new Validator({
    name: [
        new Required( true )
    ],
    location: [
        new Required( true )
    ],
    recint: [
        new Required( true )
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