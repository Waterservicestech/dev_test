import request from 'supertest'

import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../..'
import { createTestUser } from '../../../utils/test/create-test-user'
import { resetDatabase } from '../../../utils/test/reset-database'
import { QueryRunner } from 'typeorm'
import { AppDataSource } from '../../../data-source'

describe('Find user by email (e2e)', () => {
  let queryRunner: QueryRunner

  beforeEach(async () => {
    queryRunner = AppDataSource.createQueryRunner()

    await queryRunner.startTransaction()

    await createTestUser({ email: 'test@test.com' })
  })

  afterEach(async () => {
    await queryRunner.rollbackTransaction()

    await queryRunner.release()
  })

  afterAll(async () => {
    await resetDatabase()
  })

  it('should be able to find a user by email', async () => {
    const response = await request(app).get('/users').query({
      email: 'test@test.com',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.user.email).toEqual('test@test.com')
  })

  it('should not be able to find a user with wrong email', async () => {
    const response = await request(app).get('/users').query({
      email: 'invalid@email.com',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Resource not found')
  })
})
