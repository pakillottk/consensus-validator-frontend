import BaseRule from './BaseRule';

export default class ValidEmail extends BaseRule {
    evaluate( value ) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( !regex.test( value ) ) {
            return 'Email no válido';
        }
        
        return null;
    }
}