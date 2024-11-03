import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    providers: [
        {
            provide: DataSource,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                try {
                    const dataSource = new DataSource({
                        type: 'mysql',
                        host: configService.get('MYSQL_HOST'),
                        port: configService.get<number>('MYSQL_PORT'),
                        username: configService.get('MYSQL_USER'),
                        password: configService.get('MYSQL_PASSWORD'),
                        database: 'finish',
                        entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
                        maxQueryExecutionTime: 500,
                        connectTimeout: 100,
                        logging: ['error'],
                        synchronize: true, // dev 전용
                    });
                    await dataSource.initialize(); // initialize the data source
                    console.log('Database connected successfully');
                    return dataSource;
                } catch (error) {
                    console.log('Error connecting to database');
                    throw error;
                }
            },
        },
    ],
    exports: [DataSource],
})
export class DatabaseModule {}
