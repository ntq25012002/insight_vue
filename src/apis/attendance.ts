import axios from 'axios';
import { AttendanceType } from '@/types/attendance';

interface Filters {
  [key: string]: string | null;
}

const instance = axios.create({
  baseURL: 'https://localhost:44384/ii', 
});

export const getAttendances = (filters = {}) => {
    if(Object.keys(filters).length > 0) {
        const filteredFields:Filters = {};
        Object.entries(filters).forEach(([key, value]) => {
          if (value != null) {
            filteredFields[key] = value.toString().trim();
          }
        });
        const queryParams = Object.keys(filteredFields).map(key => `${key}=${filteredFields[key]}`).join('&');
       
        return instance.get(`/GetAttendances?${queryParams}`);
    }
    return instance.get('/GetAttendances')
};

export const addAttendance = (data: AttendanceType) => instance.post(`/AddAttendance`,data);
export const getAttendanceById = (attendanceId: number) => instance.get(`/GetAttendanceById/${attendanceId}`);
export const updateAttendance = (attendanceId:number, data:AttendanceType) => instance.put(`/UpdateAttendance/${attendanceId}`, data);
export const deleteAttendances = (attendanceIds: number[]) => instance.post(`/DeleteRangeAttendance`, attendanceIds);
