export enum ExceptionCode {
    // 인증 관련 예외
    EMAIL_NOT_FOUND = '0001',
    NOT_AUTHENTICATED = '0002',
    EMAIL_EXISTS = '0003',
    JWT_INVALID_TOKEN = '0004',
    JWT_USER_NOT_FOUND = '0005',
    JWT_EXPIRED = '0006',
    JWT_INVALID_SIGNATURE = '0007',
    USER_NOT_FOUND = '0008',

    // 기타 예외
    INVALID_INPUT = '1001',
    RESOURCE_NOT_FOUND = '1002',
    PERMISSION_DENIED = '1003',
    // 필요에 따라 더 많은 예외 코드를 추가할 수 있습니다
}
