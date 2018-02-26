import BaseRule from './BaseRule';

export default class FixedLength extends BaseRule {
    constructor( ignoreOnEdit, length ) {
        super( ignoreOnEdit );

        this.length = length;
    }

    evaluation( value ) {
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