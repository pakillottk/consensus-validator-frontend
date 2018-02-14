import BaseRule from './BaseRule';

export default class MatchRegex extends BaseRule {
    constructor( regex ) {
        super();

        this.regex = regex;
    }

    evaluate( value ) {
        if( !this.regex.test( value ) ) {
            return 'Formato no válido';
        }
        
        return null;
    }
}