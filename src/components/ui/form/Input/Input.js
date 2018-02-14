import React from 'react';

export default class Input extends React.Component {
    render() {
        const { value, onChange } = this.props;
        return(
            <input {...this.props} value={value} onChange={onChange} />
        );
    }
}