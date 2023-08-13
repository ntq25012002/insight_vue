import * as userApi from "@/apis/user"; 
import { Commit } from 'vuex';
import { UserType, UserStatusEnum, TypeUserEnum } from '@/types/user';

export const getUsers = ({commit}: { commit: Commit }, filters: {} ) => {
    userApi.getUsers(filters).then((res:any) => {
        const dataUsers: UserType[] = res.data.data.map((item: UserType) => (Object.assign({}, item, { fullname: item.fisrtName + ' ' + item.lastname })));
        commit('GET_USERS', dataUsers);
    })
    .catch(err => {
        console.log(err);
    })
}

export const getOptionUsers = ({commit}: { commit: Commit }, userId = 0 ) => {
    userApi.getUsers().then((res:any) => {
        const dataUsers: UserType[] = res.data.data.map((item: UserType) => (Object.assign({}, item, { fullname: item.fisrtName + ' ' + item.lastname })));
        const optionUsers = [...dataUsers.filter((item: UserType) => item.id != userId)
            .map((item: UserType) => (Object.assign({}, {'id': item.id}, { 'value': item.fullname })))]
        commit('SET_OPTION_USERS', optionUsers);
    })
    .catch(err => {
        console.log(err);
    })
}

export const addUser = async ({commit}: { commit: Commit }, user: UserType) => {
    if (
        (user.userStatus !== UserStatusEnum.ACTIVE &&
        user.userStatus !== UserStatusEnum.LOCK &&
        user.userStatus !== UserStatusEnum.WAITCONFIRM) 
        ||
        (user.typeUser !== TypeUserEnum.OFFICIAL &&
        user.typeUser !== TypeUserEnum.PARTTIME &&
        user.typeUser !== TypeUserEnum.CONTRACT &&
        user.typeUser !== TypeUserEnum.SUPPORT && 
        user.typeUser !== TypeUserEnum.CUSTOMER &&
        user.typeUser !== TypeUserEnum.PROBATIONARY)
    ) {
        commit('SET_ADD_STATUS', false);

        console.log("Invalid userStatus value or typeUser value");
        return;
    }

    try {
        const res = await userApi.addUser(user);
        commit('SET_ADD_STATUS', true);
        console.log("res: ", res);
    } catch (err) {
        commit('SET_ADD_STATUS', false);
        console.log(err);
    }

    // userApi.addUser(user).then((res:any) => {
    //     commit('SET_USER', res.data.data);
    //     commit('SET_ADD_STATUS', true);
    // })
    // .catch(err => {
    //     console.log(err);
    //     commit('SET_ADD_STATUS', false);
    // })
}


export const updateUser = async ({commit} : {commit: Commit},user: UserType) => {
    if (
        (user.userStatus !== UserStatusEnum.ACTIVE &&
        user.userStatus !== UserStatusEnum.LOCK &&
        user.userStatus !== UserStatusEnum.WAITCONFIRM) 
        ||
        (user.typeUser !== TypeUserEnum.OFFICIAL &&
        user.typeUser !== TypeUserEnum.PARTTIME &&
        user.typeUser !== TypeUserEnum.CONTRACT &&
        user.typeUser !== TypeUserEnum.SUPPORT && 
        user.typeUser !== TypeUserEnum.CUSTOMER &&
        user.typeUser !== TypeUserEnum.PROBATIONARY)
    ) {
        commit('SET_UPDATE_STATUS', false);

        console.log("Invalid userStatus value or typeUser value");
        return;
    }

    try {
        const res = await userApi.updateUser(user.id,user);
        commit('SET_UPDATE_STATUS', true);
        console.log("res: ", res);
    } catch (err) {
        commit('SET_UPDATE_STATUS', false);
        console.log(err);
    }
}

export const deleteUsers = async ({commit}: { commit: Commit }, userIds: number[]) => {
    try {
        const res = await userApi.deleteUsers(userIds);
        commit('SET_DELETE_STATUS', true);
        console.log("res: ", res);
        
    } catch (err) {
        commit('SET_DELETE_STATUS', false);
        console.log(err);
    }
}