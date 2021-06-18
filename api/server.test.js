const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /register', () => {

  it('returns a status 201 OK', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'user1', password: 'password' })
    expect(res.status).toBe(201)
  })

  it('returns a failure status if username/password not given', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: '', password: 'password' })
    expect(res.status).toBe(400)
  })
})

describe('[POST] /login', () => {
  it('returns a message on successful login', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'user1', password: 'password' })
    const res = await request(server)
      .post('/api/auth/login').send({username: 'user1', password: 'password'})
    expect(res.body.message).toBe("welcome, user1")
  })
  it('returns a failure status if given a nonexistant user', async () => {
    const res = await request(server)
      .post('/api/auth/login').send({username: 'user1', password: 'password'})
    expect(res.status).toBe(401)
  })
})