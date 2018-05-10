export const storeCachedImg = ( key, imgData ) => {
    return {
        type: 'STORE_CACHED_IMG',
        payload: {
            key,
            imgData
        }
    }
}

export const flushCache = () => {
    return {
        type: 'FLUSH_IMG_CACHE'
    }
}