import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModuleTest } from 'src/app.module.test';
import * as request from 'supertest';
import { UserService } from '../services/user.service';

const mockDatabaseService = {
    getAllUsers: jest.fn(() => {
        throw new Error('Database connection failed');
    }),
};

describe('UserController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModuleTest],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();        
    });   

    afterAll(async () => {
        await app.close();
    });

    describe('UserController getAllUsers', () => {

        it('/users (GET) should return statusCode 200 when the request is successful', () => {
            return request(app.getHttpServer())
                .get('/users')
                .expect(200);
        });

        it('/users (GET) should return an array of users', async () => {
            const response = await request(app.getHttpServer()).get('/users').expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    })
});


describe('UserService', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModuleTest],
        })
            .overrideProvider(UserService)
            .useValue(mockDatabaseService)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/users (GET) should handle database connection error', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(500)
            .expect((response) => {
                expect(response.body.message).toBe('Database connection failed');
            });
    });
});