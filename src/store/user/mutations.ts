
export const GET_USERS = (state: any, users: object[]) => {
    state.users = users
}

export const SET_OPTION_USERS = (state: any, users: object[]) => {
    state.optionUsers = users
}

export const SET_USER = (state: any, user: object) => {
    state.user = user
}

export const SET_DELETE_STATUS = (state: any, status: boolean) => {
    state.deleteStatus = status
}

export const SET_UPDATE_STATUS = (state: any, status: boolean) => {
    state.updateStatus = status
}

export const SET_ADD_STATUS = (state: any, status: boolean) => {
    state.addStatus = status
}
