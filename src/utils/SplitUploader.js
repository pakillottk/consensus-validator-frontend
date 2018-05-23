const SplitUploader = ( data, onUpload, limit=500, delay=250 ) => {
    let upload
    let remaining
    if( data.length > limit ) {
        upload = data.slice( 0, limit )
        remaining = data.slice( limit, data.length )
    } else if( data.length > 0 ) {
        upload = data
    }
    if( upload ) {
        onUpload( upload, remaining )
        if(remaining ) {
            setTimeout( () => SplitUploader(remaining, onUpload, limit, delay), delay )
        }
    }
}
export default SplitUploader