import request from 'supertest'

import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../..'
import { resetDatabase } from '../../../utils/test/reset-database'
import { AppDataSource } from '../../../data-source'
import { QueryRunner } from 'typeorm'

describe('Create user (e2e)', () => {
  let queryRunner: QueryRunner

  beforeEach(async () => {
    queryRunner = AppDataSource.createQueryRunner()

    await queryRunner.startTransaction()
  })

  afterEach(async () => {
    await queryRunner.rollbackTransaction()

    await queryRunner.release()
  })

  afterAll(async () => {
    await resetDatabase()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.id).toEqual(expect.any(Number))
  })

  it('should not be able to create a new user with invalid informations', async () => {
    const response = await request(app).post('/users').send({
      firstName: '',
      lastName: '',
      email: '',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error')
  })
})
