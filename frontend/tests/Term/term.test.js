import { expect, test } from 'vitest'
import axios from 'axios'
import { useTermStore } from '@/stores/terms.js'

test('create new academic term', async () => {
    const termStore = useTermStore()

    const newTerm = {
        start_date: 'August 01, 2024',
        end_date: 'May 31, 2025',
        batch_number: '9',
    }

    const response = await axios.post('http://localhost:3000/term-management', newTerm)

    expect(response.status).toBe(200)

    expect(response.data).toHaveProperty('id')
    expect(response.data.batch_number).toBe(newTerm.batch_number)
    expect(response.data.start_date).toBe(newTerm.start_date)
    expect(response.data.end_date).toBe(newTerm.end_date)

    const termInStore = termStore.data.find(term => term.id === response.data.id)
    expect(termInStore).toBeDefined()

    expect(termInStore.term_status).toBe('Active')
    const previousTerm = termStore.data.find(term => term.id === response.data.id - 1)
    expect(previousTerm.term_status).toBe('Inactive')
})
