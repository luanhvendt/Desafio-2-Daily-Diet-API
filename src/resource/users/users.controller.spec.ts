import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../database/PrismaService';
import { UsersModule } from './users.module';

describe('UsersController', () => {
  let app: INestApplication
  let prisma: PrismaService
  let testAccessToken;
  let testRefreshToken;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /auth/login', async () => {
    const user = await prisma.user.create({ data: { name: 'Luan', email: `teste@${randomUUID()}@mail.com`, password: '123' } })

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)

    expect(response.statusCode).toBe(200)

    const responseBody = JSON.parse(response.text)
    const accessToken = responseBody.accessToken
    testAccessToken = accessToken

    const refreshToken = responseBody.refreshToken
    testRefreshToken = refreshToken
  })

  test('[POST] /auth/refresh', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: testRefreshToken })

    expect(response.statusCode).toBe(200)

    const newRefreshToken = response.body.refreshToken
    testRefreshToken - newRefreshToken
  })

  test('[POST] /user', async () => {
    const user = await prisma.user.create({ data: { name: 'Luan', email: `teste@${randomUUID()}@mail.com`, password: '123' } })

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)

    expect(responseLogin.statusCode).toBe(200)

    const responseBody = JSON.parse(responseLogin.text)
    const accessToken = responseBody.accesToken
    testAccessToken = accessToken

    const refreshToken = responseBody.refreshToken
    testRefreshToken = refreshToken

    const response = await request(app.getHttpServer())
      .post('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: `teste`,
        email: `teste@${randomUUID()}@mail.com`,
        password: `123`,
      });

    expect(response.statusCode).toBe(201);
  });

  test('[PUT] /user/:id', async () => {
    const user = await prisma.user.create({ data: { name: 'Luan', email: `teste@${randomUUID()}@mail.com`, password: '123' } })

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)

    expect(responseLogin.statusCode).toBe(200)

    const responseBody = JSON.parse(responseLogin.text)
    const accessToken = responseBody.accesToken
    testAccessToken = accessToken

    const refreshToken = responseBody.refreshToken
    testRefreshToken = refreshToken

    const response = await request(app.getHttpServer())
      .put(`/user/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'alterado',
        email: `alterado${randomUUID()}@mail.com`,
        password: '1234',
      })

    expect(response.statusCode).toBe(200);
  })

  test('[DELETE] /user/:id', async () => {
    const user = await prisma.user.create({ data: { name: 'Luan', email: `teste@${randomUUID()}@mail.com`, password: '123' } })

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)

    expect(responseLogin.statusCode).toBe(200)

    const responseBody = JSON.parse(responseLogin.text)
    const accessToken = responseBody.accesToken
    testAccessToken = accessToken

    const refreshToken = responseBody.refreshToken
    testRefreshToken = refreshToken

    const response = await request(app.getHttpServer())
      .delete(`/user/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200);
  })
})
