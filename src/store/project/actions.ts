import * as projectApi from "@/apis/project"; 
// import { getUsers } from "@/apis/user"; 
import { Commit } from 'vuex';
import { ProjectType } from '@/types/project';
// import { UserType } from '@/types/user';

export const getProjects = ({commit}: { commit: Commit }, filters: {} ) => {
    projectApi.getProjects(filters).then((res:any) => {
        const dataProjects: ProjectType[] = res.data.data;
        // console.log('res: ', res);
        commit('GET_PROJECTS', dataProjects);
    })
    .catch(err => {
        console.log(err);
    })
}

// export const getOptionUsers = ({commit}: { commit: Commit }, userId = 0 ) => {
//     getUsers().then((res:any) => {
//         const dataUsers: UserType[] = res.data.data.map((item: UserType) => (Object.assign({}, item, { fullname: item.fisrtName + ' ' + item.lastname })));
//         const optionUsers = [...dataUsers.filter((item: UserType) => item.id != userId)
//             .map((item: UserType) => (Object.assign({}, {'id': item.id}, { 'value': item.fullname })))]
//         commit('SET_OPTION_USERS', optionUsers);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

export const addProject = async ({commit}: { commit: Commit }, project: ProjectType) => {
    try {
        const res = await projectApi.addProject(project);
        commit('SET_ADD_STATUS', true);
        console.log("res add: ", res);
    } catch (err) {
        commit('SET_ADD_STATUS', false);
        console.log(err);
    }
}

export const updateProject = async ({commit} : {commit: Commit}, project: ProjectType) => {
    try {
        const res = await projectApi.updateProject(project.id,project);
        commit('SET_UPDATE_STATUS', true);
        console.log("res: ", res);
    } catch (err) {
        commit('SET_UPDATE_STATUS', false);
        console.log(err);
    }
}

export const deleteProjects = async ({commit}: { commit: Commit }, projectIds: number[]) => {
    try {
        const res = await projectApi.deleteProjects(projectIds);
        commit('SET_DELETE_STATUS', true);
        console.log("res: ", res);
        
    } catch (err) {
        commit('SET_DELETE_STATUS', false);
        console.log(err);
    }
}