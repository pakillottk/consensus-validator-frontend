import Validator from './Validator'

import Required from './Rules/Required'

export default new Validator({
    zone: [
        new Required( true )
    ]
});