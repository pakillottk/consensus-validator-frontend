export default class BaseRule {
    constructor( ignoreOnEdit ) {
        this.ignoreOnEdit = ignoreOnEdit
    }

    //Dummy method, value ever valid
    evaluation( value ) {
        return '';
    }

    evaluate( value, editMode ) {
        if( this.ignoreOnEdit && editMode ) {
            return '';
        }

        return this.evaluation( value );
    }
}