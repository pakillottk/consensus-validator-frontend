import EntityActions from './generators/EntityActions';
import API from '../../API/API';
import Request from '../../communication/Request';

export const crud = EntityActions( 'codes', API, {
    fetch: '/codes',
    create: '/codes',
    update: '/codes',
    delete: '/codes',
    bulkDelete:'/codes/bulkDelete'
});

export const generateCodes = ( ammount, typeId, sessionId, meta ) => {
    return {
        type: 'CODE_GENERATION',
        payload: 
            API.post( 
                '/codes/generate/'+ammount, 
                new Request({
                        type_id: typeId,
                        session_id: sessionId,
                    },
                    API.headers.headers
                )
            ),
        meta
    }
}