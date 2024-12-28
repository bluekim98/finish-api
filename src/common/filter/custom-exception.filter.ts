import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { ExceptionCode } from '@src/common/enums/exception-code.enum';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        // 커스텀 예외 객체 처리
        switch (exception.code) {
            case ExceptionCode.COMPANY_NOT_FOUND:
            case ExceptionCode.BRANCH_NOT_FOUND:
            case ExceptionCode.USER_NOT_FOUND:
                response.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: exception.message,
                });
                return;
            default:
                response.status(exception.status ?? 500).json({
                    statusCode: exception?.response?.status ?? 500,
                    message:
                        exception?.response?.message ?? 'Internal Server Error',
                });
                return;
        }
    }
}
