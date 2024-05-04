import { expect, test } from 'vitest'
import axios from 'axios'

test('login test', async () => {
    const response = await axios.post('http://localhost:8080/auth/login', {
        userId: '91267',
        password: 'rootpass'
    })

    // Check if the status code is 200 (OK)
    expect(response.status).toBe(200)

    // Check if the response contains a token
    expect(response.data.token).toBeTruthy()

    // Check if the response contains a refresh token
    expect(response.data.refreshToken).toBeTruthy()

    // Check if the response contains the expected user data
    expect(response.data.staff.id).toBe(91267)
    expect(response.data.staff.accessLevel).toBe(1)
})

test('login test - no user ID', async () => {
    try {
        await axios.post('http://localhost:8080/auth/login', {
            password: 'rootpass'
        })
    } catch (error) {
        // Check if the status code is 401 (Unauthorized)
        expect(error.response.status).toBe(401)
    }
})

test('login test - no password', async () => {
    try {
        await axios.post('http://localhost:8080/auth/login', {
            userId: '91267'
        })
    } catch (error) {
        // Check if the status code is 401 (Unauthorized)
        expect(error.response.status).toBe(500)
    }
})

test('login test - user ID does not exist', async () => {
    try {
        await axios.post('http://localhost:8080/auth/login', {
            userId: '00000',
            password: 'rootpass'
        })
    } catch (error) {
        // Check if the status code is 401 (Unauthorized)
        expect(error.response.status).toBe(401)
    }
})

test('login test - incorrect password', async () => {
    try {
        await axios.post('http://localhost:8080/auth/login', {
            userId: '91267',
            password: 'wrongpass'
        })
    } catch (error) {
        // Check if the status code is 401 (Unauthorized)
        expect(error.response.status).toBe(401)
    }
})