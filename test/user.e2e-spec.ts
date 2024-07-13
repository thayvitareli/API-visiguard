import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../src/modules/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppModule } from '../src/app.module';

interface User {
  id: number;
  name: string;
  password: string;
  CPF: string;
  privilege: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

describe('User Controller (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let access_token_admin = '';
  let access_token_common = '';
  let userAdmin: User;
  let userCommon: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);

    await app.init();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();

    userAdmin = await prismaService.user.create({
      data: {
        CPF: '11111111111',
        password: '',
        name: 'Rafael Oliveira',
        privilege: 1,
        status: true,
      },
    });

    userCommon = await prismaService.user.create({
      data: {
        CPF: '11111111112',
        password: '',
        name: 'João da Silva',
        privilege: 0,
        status: true,
      },
    });

    access_token_admin = jwtService.sign({ userId: userAdmin?.id });
    access_token_common = jwtService.sign({
      userId: userCommon?.id,
    });
  });

  describe('/user (GET)', () => {
    it('Should return status 200 - list of users', async () => {
      return request(app.getHttpServer())
        .get('/user')
        .set('Authorization', `Bearer ${access_token_admin}`)
        .then((response) => {
          expect(response.body).toEqual({
            records: [
              {
                id: expect.any(Number),
                CPF: '11111111111',
                name: 'Rafael Oliveira',
                privilege: 1,
                created_at: expect.any(String),
              },
              {
                id: expect.any(Number),
                CPF: '11111111112',
                name: 'João da Silva',
                privilege: 0,
                created_at: expect.any(String),
              },
            ],
          });

          expect(response.status).toBe(200);
        });
    });

    it('Should return a status 401 - Unauthorized', () => {
      return request(app.getHttpServer())
        .get('/user')
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.text).toBe(
            '{"message":"Unauthorized","statusCode":401}',
          );
        });
    });

    it('Should return a status 403 - Forbidden', () => {
      return request(app.getHttpServer())
        .get('/user')
        .set('Authorization', `Bearer ${access_token_common}`)
        .then((response) => {
          expect(response.status).toBe(403);
        });
    });
  });

  describe('/user (POST)', () => {
    it('Should return 201 - created', async () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          CPF: '123.125.452-74',
          name: 'Joana Darc',
          password: 'minhasenhasupersecreta123',
          privilege: 0,
        })
        .set('Authorization', `Bearer ${access_token_admin}`)
        .then((response) => {
          expect(response.status).toBe(201);
        });
    });

    it('Should return 400 - Unauthorized', async () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          CPF: '123.125.452-74',
          name: 'Joana Darc',
          password: 'minhasenhasupersecreta123',
          privilege: 0,
        })
        .then((response) => {
          expect(response.status).toBe(401);
        });
    });

    it('Should return 403 - Forbidden', async () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          CPF: '123.125.452-74',
          name: 'Joana Darc',
          password: 'minhasenhasupersecreta123',
          privilege: 0,
        })
        .set('Authorization', `Bearer ${access_token_common}`)
        .then((response) => {
          expect(response.status).toBe(403);
        });
    });

    it('Should return 400 - Bad Request - missing attribute in body', async () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          CPF: '123.125.452-74',
          name: 'Joana Darc',
          privilege: 0,
        })
        .set('Authorization', `Bearer ${access_token_common}`)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body?.message).toEqual([
            'password should not be empty',
            'password must be a string',
          ]);
        });
    });

    //end
  });
});
