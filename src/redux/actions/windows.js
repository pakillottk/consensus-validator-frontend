export const create = ( title, content ) => {
    return {
        type: 'ADD_WINDOW',
        payload: {
            title,
            content
        }
    }
}

export const update = ( id, data ) => {
    return {
        type: 'UPDATE_WINDOW',
        payload: {
            id,
            data
        }
    }
}

export const remove = ( id ) => {
    return {
        type: 'REMOVE_WINDOW',
        payload: {
            id
        }
    }
}