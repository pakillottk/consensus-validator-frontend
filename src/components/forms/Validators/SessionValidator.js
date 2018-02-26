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
    ]
});