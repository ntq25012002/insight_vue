import * as userApi from "@/apis/user"; 
import { Commit } from 'vuex';

export const getUsers = ({commit}: { commit: Commit }) => {
    userApi.getUsers().then((res:any) => {
        commit('GET_USERS', res.data.data);
    })
}

export const addUser = ({commit}: { commit: Commit }) => {
    userApi.getUsers().then((res:any) => {
        commit('GET_USERS', res.data.data);
    })
}

export const updateUser = ({commit}: { commit: Commit }) => {
    userApi.getUsers().then((res:any) => {
        commit('GET_USERS', res.data.data);
    })
}


export const deleteUsers = ({commit}: { commit: Commit }, userIds: number[]) => {
    userApi.deleteUsers(userIds).then((res:any) => {
        commit('GET_USERS', res.data.data);
    })
}