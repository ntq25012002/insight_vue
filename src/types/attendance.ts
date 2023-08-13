interface AttendanceType {
    userId: number,
    contractId: number,
    workShiftId: number,
    totalWorkMinute: number,
    isOverTime: boolean,
    enterTime: string,
    outTime: string,
    typeAttendance: TypeAttendanceEnum,
    attendanceStatus: AttendanceStatusEnum,
    id: number
}

enum AttendanceStatusEnum {
    UNCONFIMRED = 1,
    ENTERLATE = 2,
    OUTSOON = 3,
    LATEANDSOON = 4,
    OK = 5,
}

enum TypeAttendanceEnum {
    FACEMATCHING = 1,
    FINGERMATCHING = 2,
    CHECKONAPP = 3
}

export {AttendanceType, AttendanceStatusEnum, TypeAttendanceEnum}