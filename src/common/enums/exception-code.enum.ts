export enum ExceptionCode {
    // 인증 관련 예외
    EMAIL_NOT_FOUND = 1,
    NOT_AUTHENTICATED = 2,
    EMAIL_EXISTS = 3,
    JWT_INVALID_TOKEN = 4,
    JWT_USER_NOT_FOUND = 5,
    JWT_EXPIRED = 6,
    JWT_INVALID_SIGNATURE = 7,

    // 찾기 실패
    COMPANY_NOT_FOUND = 101,
    USER_NOT_FOUND = 101,

    // 기타 예외
    INVALID_INPUT = 1001,
    RESOURCE_NOT_FOUND = 1002,
    PERMISSION_DENIED = 1003,
    // 필요에 따라 더 많은 예외 코드를 추가할 수 있습니다
}
