// enum ProjectStatusEnum {
//     ACTIVE = 1,
//     UNACTIVE = 2
// }
interface ProjectType {
    projectName: string,
    poId: number,
    pmId: number,
    createTime: string,
    updateTime: string,
    dateTime: string,
    estimateDay: number,
    isLate: boolean,
    statusId: number,
    id: number
}

export {ProjectType}