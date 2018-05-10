import base64Img from 'base64-img';
export default ( urlToImg ) => {
    return new Promise( ( resolve, reject ) => {
        base64Img.requestBase64( urlToImg, ( err, res, body ) => {
            if( err ) {
                reject( err );
                return;
            }

            resolve( body );
        })
    });
}