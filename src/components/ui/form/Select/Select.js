import React from 'react';

export default class Select extends React.Component {
    render() {
        const { options } = this.props;
        return(
            <select {...this.props}>
                { options.map( ( option, index ) => <option key={index} value={option.value}>{option.text}</option> ) }
            </select>
        );
    }
}