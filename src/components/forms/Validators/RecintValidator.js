import Validator from './Validator'

import Required from './Rules/Required'

export default new Validator({
    recint: [
        new Required( true )
    ],
    location: [
        new Required( true )
    ]
});