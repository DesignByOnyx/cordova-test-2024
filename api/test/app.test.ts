// For more information about this file see https://dove.feathersjs.com/guides/cli/app.test.html
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import axios from 'axios'
import type { Server } from 'http'
import { app } from '../src/app'

const port = app.get('port')
const appUrl = `http://${app.get('host')}:${port}`

describe('Feathers application tests', () => {
  let server: Server

  beforeAll(async () => {
    server = await app.listen(port)
  })

  afterAll(async () => {
    await app.teardown()
  })

  it('starts and shows the index page', async () => {
    const { data } = await axios.get<string>(appUrl)

    expect(data.indexOf('<html lang="en">')).not.toBe(-1);
  })

  it('shows a 404 JSON error', async () => {
    try {
      await axios.get(`${appUrl}/path/to/nowhere`, {
        responseType: 'json'
      })
      expect.fail('should never get here')
    } catch (error: any) {
      const { response } = error
      expect(response?.status).toBe(404);
      expect(response?.data?.code).toBe(404);
      expect(response?.data?.name).toBe('NotFound');
    }
  })
})
