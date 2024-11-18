import request from 'supertest'

import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../..'
import { createTestPost } from '../../../utils/test/create-test-post'
import { resetDatabase } from '../../../utils/test/reset-database'
import { QueryRunner } from 'typeorm'
import { AppDataSource } from '../../../data-source'

describe('Update post (e2e)', () => {
  let queryRunner: QueryRunner
  let postId: number

  beforeEach(async () => {
    queryRunner = AppDataSource.createQueryRunner()

    await queryRunner.startTransaction()

    const { id } = await createTestPost()

    postId = id
  })

  afterEach(async () => {
    await queryRunner.rollbackTransaction()

    await queryRunner.release()
  })

  afterAll(async () => {
    await resetDatabase()
  })

  it('should be able to update a post', async () => {
    const response = await request(app).put(`/posts/${postId}`).send({
      title: 'Filled title',
      description: 'Filled description',
    })

    expect(response.statusCode).toEqual(204)
  })
})
