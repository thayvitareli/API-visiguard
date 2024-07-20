import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
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

describe('Collaborator Controller (e2e)', () => {
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
    await prismaService.collaborator.deleteMany();

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

  describe('/collaborator (GET)', () => {
    it('Should return status 200 - list of collaborators', async () => {
      return request(app.getHttpServer())
        .get('/collaborator')
        .set('Authorization', `Bearer ${access_token_admin}`)
        .then((response) => {
          expect(response.status).toBe(200);
        });
    });
  });

  describe('/collaborator (POST)', () => {
    it('Should return 201 - created', async () => {
      return request(app.getHttpServer())
        .post('/collaborator')
        .send({
          name: 'colaborador 1',
          register_employee: '643h9o',
          position: 1,
          departament: 2,
        })
        .set('Authorization', `Bearer ${access_token_admin}`)
        .then((response) => {
          expect(response.status).toBe(201);
        });
    });

    it('Should return 400 - Unauthorized', async () => {
      return request(app.getHttpServer())
        .post('/collaborator')
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

    it('Should return 400 - Bad Request - register employee already existe', async () => {
      await prismaService.collaborator.create({
        data: {
          name: 'colaborador 1',
          register_employ: '643h9o',
          position: 1,
          department: 2,
        },
      });

      return request(app.getHttpServer())
        .post('/collaborator')
        .send({
          name: 'colaborador 1',
          register_employee: '643h9o',
          position: 1,
          departament: 2,
        })
        .set('Authorization', `Bearer ${access_token_admin}`)
        .then((response) => {
          expect(response.status).toBe(400);
        });
    });

    //end
  });
});
