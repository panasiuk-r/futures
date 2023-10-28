import request from 'supertest'

import app from '../src/app'
import Coin from '../src/models/Coin'
import redlock from '../src/database/redlock'
import { redis } from '../src/database/connection'
import { createWS, ws } from '../src/websockets/websocket'

jest.mock('../src/websockets/websocket');
jest.spyOn(Coin, 'create').mockResolvedValue('')
jest.spyOn(redis, 'hset').mockResolvedValue(1)
jest.spyOn(redlock, 'acquire').mockImplementation(jest.fn().mockResolvedValue({release: jest.fn()}))

const mockedCreateWS = createWS as jest.MockedFunction<typeof createWS>


describe('/coin', () => {
  test('should respond 201 for a valid POST request', async () => {
    mockedCreateWS.mockImplementation(jest.fn().mockResolvedValue({}))
    const res = await request(app).post("/api/coin").send({ "coin": "btc" });
    expect(res.statusCode).toBe(201)
  })

  test('should respond 500 for a server error', async () => {
    mockedCreateWS.mockRejectedValue(new Error('Some new error'))
    const res = await request(app).post("/api/coin").send({ "coin": "btc" });
    expect(res.statusCode).toBe(500)
  })

  test('should respond 500 for a DELETE request if ws in undefined ', async () => {
    mockedCreateWS.mockRejectedValue(new Error('Some new error'))
    const res = await request(app).delete("/api/coin/btc");
    expect(res.statusCode).toBe(500)
    expect(res.body).toStrictEqual({'error': 'WebSocket connection is not available'})
  }) 
})