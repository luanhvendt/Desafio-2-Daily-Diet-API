import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { randomUUID } from "crypto";
import * as request from 'supertest';
import { AppModule } from "../../app.module";
import { PrismaService } from "../../database/PrismaService";
import { DietModule } from "./diet.module";

describe('DietController', () => {
  let app: INestApplication
  let prisma: PrismaService
  let testAccessToken;
  let testRefreshToken;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DietModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /diet', async () => {
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
      .post('/diet')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'meal',
        description: `description ${randomUUID()}`,
        onTheDiet: 'Y',
        sessionId: '1',
      })

    expect(response.statusCode).toBe(201)
  })

  test('[GET] /diet/summary/:sessionId', async () => {
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
      .get('/diet/summary/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
  })

  test('[GET] /diet/:id', async () => {
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

    const meal = await prisma.diet.create({ data: { name: 'Unique', description: 'description', onTheDiet: 'Y', sessionId: '2' } })

    const response = await request(app.getHttpServer())
      .get(`/diet/${meal.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
  })

  test('[GET] /diet', async () => {
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
      .get('/diet')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
  })

  test('[PUT] /diet/:id', async () => {
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

    const meal = await prisma.diet.create({ data: { name: 'Unique', description: 'description', onTheDiet: 'Y', sessionId: '2' } })

    const response = await request(app.getHttpServer())
      .put(`/diet/${meal.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'updated',
        description: 'potato',
      })

    expect(response.statusCode).toBe(200)
  })

  test('[DELETE] /diet/:id', async () => {
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

    const meal = await prisma.diet.create({ data: { name: 'Unique', description: 'description', onTheDiet: 'Y', sessionId: '2' } })

    const response = await request(app.getHttpServer())
      .delete(`/diet/${meal.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
});
