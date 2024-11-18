import request from 'supertest'

import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../..'
import { createTestUser } from '../../../utils/test/create-test-user'
import { resetDatabase } from '../../../utils/test/reset-database'
import { QueryRunner } from 'typeorm'
import { AppDataSource } from '../../../data-source'

describe('Update user (e2e)', () => {
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

  it('should be able to update a user', async () => {
    const response = await request(app).put(`/users/${userId}`).send({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'test@test.com',
    })

    expect(response.statusCode).toEqual(204)
  })

  it('should not be able to update a user with wrong id', async () => {
    const response = await request(app).put('/users/9999').send({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'test@test.com',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Resource not found')
  })

  it('should not be able to update a user with invalid informations', async () => {
    const response = await request(app).put(`/users/${userId}`).send({
      firstName: '',
      lastName: '',
      email: '',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error')
  })
})
