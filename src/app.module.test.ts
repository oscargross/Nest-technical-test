import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        TypeOrmModule.forRootAsync(
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', '0.0.0.0'),
                    port: Number(configService.get('DB_PORT_TEST', 5438)),
                    database: configService.get('DB_DATABASE_TEST', 'postgres-test'),
                    username: configService.get('DB_USERNAME_TEST', 'postgres-test'),
                    password: configService.get('DB_PASSWORD_TEST', 'password-test'),
                    synchronize: true,
                    entities: [__dirname + '/**/*.entity{.js,.ts}'],
                }),
            }
        )
    ]
})
export class AppModuleTest { }