import Request from '../Request';

class EntityRouter {
    constructor( entity, connection ) {
        this.entity     = entity;
        this.connection = connection;
    }

    get( query ) {
        const request = new Request( {}, query );
        return this.connection.get( this.entity.routes.read, request )
    }

    create( data ) {
        const request = new Request( data );
        return this.connection.post( this.entity.routes.create, request ); 
    }

    update( id, data ) {
        const request = new Request( data );
        return this.connection.put( this.entity.routes.update + '/' + id, request );
    }

    delete( id ) {
        return this.connection.delete( this.entity.routes.delete + '/' + id );
    }
}

export default EntityRouter;