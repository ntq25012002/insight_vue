import * as attendanceApi from "@/apis/attendance"; 
import { Commit } from 'vuex';
import { AttendanceType, TypeAttendanceEnum, AttendanceStatusEnum } from '@/types/attendance';

export const getAttendances = ({commit}: { commit: Commit }, filters: {} ) => {
    attendanceApi.getAttendances(filters).then((res:any) => {
        const dataAttendances: AttendanceType[] = res.data.data;
        // console.log('res: ', res);
        commit('GET_ATTENDANCES', dataAttendances);
    })
    .catch(err => {
        console.log(err);
    })
}

export const addAttendance = async ({commit}: { commit: Commit }, attendance: AttendanceType) => {
    if (
        (attendance.typeAttendance !== TypeAttendanceEnum.FACEMATCHING &&
            attendance.typeAttendance !== TypeAttendanceEnum.FINGERMATCHING &&
            attendance.typeAttendance !== TypeAttendanceEnum.CHECKONAPP) 
        ||
        (attendance.attendanceStatus !== AttendanceStatusEnum.UNCONFIMRED &&
            attendance.attendanceStatus !== AttendanceStatusEnum.ENTERLATE &&
            attendance.attendanceStatus !== AttendanceStatusEnum.OUTSOON &&
            attendance.attendanceStatus !== AttendanceStatusEnum.LATEANDSOON && 
            attendance.attendanceStatus !== AttendanceStatusEnum.OK )
    ) {
        commit('SET_ADD_STATUS', false);
        console.log("Invalid userStatus value or typeUser value");
        return;
    }
    try {
        const res = await attendanceApi.addAttendance(attendance);
        commit('SET_ADD_STATUS', true);
        console.log("res add: ", res);
    } catch (err) {
        commit('SET_ADD_STATUS', false);
        console.log(err);
    }
}

export const updateAttendance = async ({commit} : {commit: Commit}, attendance: AttendanceType) => {
    try {
        const res = await attendanceApi.updateAttendance(attendance.id,attendance);
        commit('SET_UPDATE_STATUS', true);
        console.log("res: ", res);
    } catch (err) {
        commit('SET_UPDATE_STATUS', false);
        console.log(err);
    }
}

export const deleteAttendances = async ({commit}: { commit: Commit }, attendanceIds: number[]) => {
    try {
        const res = await attendanceApi.deleteAttendances(attendanceIds);
        commit('SET_DELETE_STATUS', true);
        console.log("res: ", res);
        
    } catch (err) {
        commit('SET_DELETE_STATUS', false);
        console.log(err);
    }
}