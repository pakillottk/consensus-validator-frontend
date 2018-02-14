export default class Validator {
    constructor( rules ) {
        this.rules = rules || {};
    }

    applyRules( values ) {
        const allErrors = {};
        Object.keys( this.rules ).forEach( field => {
            const value = values[ field ];

            const errors = [];
            this.rules[ field ].forEach( rule => {
                const result = rule.evaluate( value );
                if( result ) {
                    errors.push( result );
                }
            });
            
            if( errors.length === 0 ) {
                delete allErrors[ field ];
            } else {
                allErrors[ field ] = errors.join( '. ' );
            }
        });

        return allErrors;
    }

    validate( values ) {       
        return this.applyRules( values );
    }
}