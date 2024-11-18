import request from 'supertest'

import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../..'
import { createTestUser } from '../../../utils/test/create-test-user'
import { resetDatabase } from '../../../utils/test/reset-database'
import { QueryRunner } from 'typeorm'
import { AppDataSource } from '../../../data-source'

describe('Delete user (e2e)', () => {
  let queryRunner: QueryRunner
  let userId: number

  beforeEach(async () => {
    queryRunner = AppDataSource.createQueryRunner()

    await queryRunner.startTransaction()

    const { id } = await createTestUser()

    userId = id
  })

  afterEach(async () => {
    await queryRunner.rollbackTransaction()

    await queryRunner.release()
  })

  afterAll(async () => {
    await resetDatabase()
  })

  it('should be able to delete a user by id', async () => {
    const response = await request(app).delete(`/users/${userId}`)

    expect(response.statusCode).toEqual(204)
  })

  it('should not be able to delete a user with wrong id', async () => {
    const response = await request(app).delete('/users/9999')

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Resource not found')
  })
})
