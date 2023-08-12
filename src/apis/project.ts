import axios from 'axios';

interface Filters {
  [key: string]: string | null;
}

const instance = axios.create({
  baseURL: 'https://localhost:44384/ii', 
});

export const getProjects = (filters = {}) => {
    if(Object.keys(filters).length > 0) {
        const filteredFields:Filters = {};
        Object.entries(filters).forEach(([key, value]) => {
          if (value != null) {
            filteredFields[key] = value.toString().trim();
          }
        });
        const queryParams = Object.keys(filteredFields).map(key => `${key}=${filteredFields[key]}`).join('&');
       
        return instance.get(`/GetProjects?${queryParams}`);
    }
    return instance.get('/GetProjects')
};

export const addProject = (data: object) => instance.post(`/AddProject`,data);
export const getProjectById = (projectId: number) => instance.get(`/GetProjectById/${projectId}`);
export const updateProject = (projectId:number, data:object) => instance.put(`/UpdateProject/${projectId}`, data);
export const deleteProjects = (projectIds: number[]) => instance.post(`/DeleteRangeProject`, projectIds);
