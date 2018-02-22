import Request from '../../../communication/Request';

const builder = ( Entity, connection, paths ) => {
    const prefix = Entity.toUpperCase();
    return {
        fetch: () => {
            return {
                type: prefix + '_FETCH',
                payload: connection.get( paths.fetch )
            }
        },
        create: ( data ) => {
            return {
                type: prefix + '_CREATE',
                payload: connection.post( paths.create, new Request( data, connection.headers.headers ) )
            }
        },
        update: ( id, data ) => {
            return {
                type: prefix + '_UPDATE',
                payload: connection.put( paths.update + '/' + id, new Request( data, connection.headers.headers ) )
            }
        },
        delete: ( id ) => {
            return {
                type: prefix + '_DELETE',
                payload: connection.delete( paths.delete + '/' + id, new Request( {}, connection.headers.headers ) ),
                meta: { deleted_id: id }
            }
        }
    }
};

export default builder;