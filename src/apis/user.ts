import axios from 'axios';

interface Filters {
  [key: string]: string | null;
}

const instance = axios.create({
  baseURL: 'https://localhost:44384/ii', 
});


export const getUsers = (filters = {}) => {
    if(Object.keys(filters).length > 0) {
        const filteredFields:Filters = {};
        Object.entries(filters).forEach(([key, value]) => {
          if (value != null) {
            filteredFields[key] = value.toString().trim();
          }
        });
        const queryParams = Object.keys(filteredFields).map(key => `${key}=${filteredFields[key]}`).join('&');
       
        return instance.get(`/GetUsers?${queryParams}`);
    }
    return instance.get('/GetUsers')
};

export const addUser = (data: object) => instance.post(`/AddUser`,data);
export const getUserById = (userId: number) => instance.get(`/GetUserById/${userId}`);
export const updateUser = (userId:number, data:object) => instance.put(`/UpdateUser/${userId}`, data);
export const deleteUsers = (userIds: number[]) => instance.post(`/DeleteRange`, userIds);
