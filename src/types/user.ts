
enum UserStatusEnum {
    ACTIVE =1,
    LOCK=2,
    WAITCONFIRM =3,
}

enum TypeUserEnum {
    OFFICIAL = 1,
    PARTTIME = 2,
    CONTRACT = 3,
    SUPPORT = 4,
    CUSTOMER = 5,
    PROBATIONARY = 6,
}
interface UserType {
    email: string,
    code: string,
    userAvatar: string,
    userWallImage: string,
    phoneNumber: string,
    password: string,
    contactCode: string,
    fisrtName: string,
    hrId: number,
    introduceUserId: number,
    lastname: string,
    payLeave: number,
    paidLeave: number,
    unPaidLeave: number,
    userStatus: UserStatusEnum,
    typeUser: TypeUserEnum,
    createTime: string,
    updateTime: string,
    id: number,
    fullname: string,
}

export {UserStatusEnum, TypeUserEnum, UserType}