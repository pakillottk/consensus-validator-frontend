import React from 'react'

export default class ImgUploader extends React.Component {
    render() {
        const { name, onChange } = this.props

        return(
            <input type="file" name={name} onChange={onChange} accept='image/*' />
        )
    }
}