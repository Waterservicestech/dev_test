import request from 'supertest'

import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../..'
import { resetDatabase } from '../../../utils/test/reset-database'
import { QueryRunner } from 'typeorm'
import { AppDataSource } from '../../../data-source'
import { createTestPost } from '../../../utils/test/create-test-post'

describe('Find post by id (e2e)', () => {
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

  it('should be able to find a post by id', async () => {
    const response = await request(app).get(`/posts/${postId}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.post.id).toEqual(postId)
  })
})
