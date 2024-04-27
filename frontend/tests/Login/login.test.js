import { expect, test, expectTypeOf } from 'vitest'
import axios from 'axios'

test('login test', async () => {
    const response = await axios.post('http://localhost:8080/auth/login', {
        username: 'janrizlibs',
        password: 'janrizpass'
    })

    // Check if the status code is 200 (OK)
    expect(response.status).toBe(200)

    // Check if the response contains a token
    expectTypeOf(response.token).toBeString
})