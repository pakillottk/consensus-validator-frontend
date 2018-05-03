import BaseRule from './BaseRule';

const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class ValidEmail extends BaseRule {
    evaluation( value ) {
        if( !mailRegex.test( value ) ) {
            return 'Email no válido';
        }
        
        return null;
    }
}