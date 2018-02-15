import React from 'react';

export default class Form extends React.Component {
    render() {
        const { styles } = this.props
        return(
            <form onSubmit={this.props.onSubmit} style={styles}>
                {this.props.children}
            </form>
        );
    }
}