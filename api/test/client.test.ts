import { describe, it, expect } from 'vitest'
import axios from 'axios'
import { app } from '../src/app'
import { createClient } from '../src/client'

import rest from '@feathersjs/rest-client'

const port = app.get('port')
const appUrl = `http://${app.get('host')}:${port}`

describe('client tests', () => {
  const client = createClient(rest(appUrl).axios(axios))

  it('initialized the client', () => {
    expect(client).toBeDefined();
  })
})
