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
                payload: connection.post( paths.create, data )
            }
        },
        update: ( data ) => {
            return {
                type: prefix + '_UPDATE',
                payload: connection.put( paths.update + '/' + data.id, data )
            }
        },
        delete: ( data ) => {
            return {
                type: prefix + '_DELETE',
                payload: connection.delete( paths.delete + '/' + data.id, data )
            }
        }
    }
};

export default builder;