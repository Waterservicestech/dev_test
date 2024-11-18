import request from 'supertest'

import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../..'
import { resetDatabase } from '../../../utils/test/reset-database'
import { AppDataSource } from '../../../data-source'
import { QueryRunner } from 'typeorm'
import { createTestUser } from '../../../utils/test/create-test-user'

describe('Create post (e2e)', () => {
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

  it('should be able to create a new post', async () => {
    const response = await request(app).post('/posts').send({
      title: 'Void title',
      description: 'Void description',
      userId,
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.id).toEqual(expect.any(Number))
  })

  it('should bot be able to create a new post with wrong userId', async () => {
    const response = await request(app).post('/posts').send({
      title: 'Void title',
      description: 'Void description',
      userId: 9999,
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Resource not found')
  })

  it('should not be able to create a new user with invalid informations', async () => {
    const response = await request(app).post('/posts').send({
      title: '',
      description: '',
      userId,
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error')
  })
})
