import React from 'react';

export default class Form extends React.Component {
    render() {
        const { styles, multipart } = this.props
        return(
            <form encType={multipart ? "multipart/form-data": ""} onSubmit={this.props.onSubmit} style={styles}>
                {this.props.children}
            </form>
        );
    }
}