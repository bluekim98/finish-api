import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from '@src/common/filter/custom-exception.filter';

async function bootstrap() {
    const port = process.env.PORT || 9000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: '*',
    });
    app.useGlobalFilters(new CustomExceptionFilter());
    await app.listen(port);
    console.log(`Server is running on port:${port}`);
}
bootstrap();
