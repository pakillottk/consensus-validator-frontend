import BaseRule from './BaseRule';

export default class MatchRegex extends BaseRule {
    constructor( ignoreOnEdit, regex ) {
        super( ignoreOnEdit );

        this.regex = regex;
    }

    evaluation( value ) {
        if( value === undefined || value === null ) {
            return null;
        }
        
        if( !this.regex.test( value ) ) {
            return 'Formato no válido';
        }
        
        return null;
    }
}