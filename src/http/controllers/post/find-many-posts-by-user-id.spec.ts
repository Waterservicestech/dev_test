import request from 'supertest'

import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../..'
import { resetDatabase } from '../../../utils/test/reset-database'
import { QueryRunner } from 'typeorm'
import { AppDataSource } from '../../../data-source'
import { createTestPost } from '../../../utils/test/create-test-post'

describe('Find many posts by user id (e2e)', () => {
  let queryRunner: QueryRunner
  let userId: number

  beforeEach(async () => {
    queryRunner = AppDataSource.createQueryRunner()

    await queryRunner.startTransaction()

    const {
      user: { id },
    } = await createTestPost()

    userId = id
  })

  afterEach(async () => {
    await queryRunner.rollbackTransaction()

    await queryRunner.release()
  })

  afterAll(async () => {
    await resetDatabase()
  })

  it('should be able to find a post list by user id', async () => {
    const response = await request(app).get(`/posts/`).query({
      userId,
    })

    expect(response.statusCode).toEqual(200)
  })
})
