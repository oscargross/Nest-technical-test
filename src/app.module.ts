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
                    port: Number(configService.get('DB_PORT', 5432)),
                    database: configService.get('DB_DATABASE', 'postgres'),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'password'),
                    synchronize: true,
                    entities: [__dirname + '/**/*.entity{.js,.ts}'],
                }),
            }            
        )
    ]
})
export class AppModule { }
