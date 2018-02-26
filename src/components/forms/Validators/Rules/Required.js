import BaseRule from './BaseRule';

export default class Required extends BaseRule {
    evaluation( value ) {
        if( value === null || value === undefined || value === '') {
            return 'El campo es obligatorio';
        }
        
        return null;
    }
}