import BaseRule from './BaseRule';

export default class FixedLength extends BaseRule {
    constructor( length ) {
        super();

        this.length = length;
    }

    evaluate( value ) {
        if( !value ) {
            return 'Valor no válido';
        }
        if( value.length === undefined ) {
            return 'Valor no válido';
        }
        if( value.length !== this.length ) {
            return 'Debe tener: ' + this.length + ' carácteres';
        }
        
        return null;
    }
}