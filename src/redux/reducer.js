const initialState = {
    username: {},
    profilePicture: {}
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(user) {
    return {
        type: 'UPDATE_USER',
        payload: initialState
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state
    }
}