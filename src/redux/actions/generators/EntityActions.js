import Request from '../../../communication/Request';

const builder = ( Entity, connection, paths ) => {
    const prefix = Entity.toUpperCase();
    return {
        fetch: ( queryString, meta ) => {
            return {
                type: prefix + '_FETCH',
                payload: connection.get( paths.fetch, new Request( {}, connection.headers.headers, queryString ) ),
                meta
            }
        },
        fetchById: ( id, meta ) => {
            return {
                type: prefix + '_SINGLE_FETCH',
                payload: connection.get( paths.fetch + '/' + id )
            }
        },
        create: ( data, queryString, meta ) => {
            return {
                type: prefix + '_CREATE',
                payload: connection.post( paths.create, new Request( data, connection.headers.headers, queryString ) ),
                meta
            }
        },
        update: ( id, data, meta ) => {
            return {
                type: prefix + '_UPDATE',
                payload: connection.put( paths.update + '/' + id, new Request( data, connection.headers.headers ) ),
                meta
            }
        },
        delete: ( id, meta ) => {
            return {
                type: prefix + '_DELETE',
                payload: connection.delete( paths.delete + '/' + id, new Request( {}, connection.headers.headers ) ),
                meta: {...meta, deleted_id: id }
            }
        }
    }
};

export default builder;