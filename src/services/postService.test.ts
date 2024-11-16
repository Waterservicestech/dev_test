// src/services/PostService.test.ts

import { describe, it, expect, beforeEach, vi } from "vitest";
import { Repository } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { mock, instance, when, verify, anything, deepEqual } from "ts-mockito";
import { PostService, CreatePostDTO } from "./postService";
import { Result } from "../utils/types";

describe("PostService", () => {
  let postRepositoryMock: Repository<Post>;
  let userRepositoryMock: Repository<User>;
  let postService: PostService;

  beforeEach(() => {
    postRepositoryMock = mock<Repository<Post>>();
    userRepositoryMock = mock<Repository<User>>();

    postService = new PostService({
      postRepository: instance(postRepositoryMock),
      userRepository: instance(userRepositoryMock),
    });
  });

  it("should create a post successfully when the user exists", async () => {
    const createPostDTO: CreatePostDTO = {
      title: "Post 01",
      description: "descrição teste",
      userId: 42,
    };

    const user: User = {
      id: createPostDTO.userId,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    } as User;

    when(
      userRepositoryMock.findOneBy(deepEqual({ id: createPostDTO.userId })),
    ).thenResolve(user);

    const savedPost: Post = {
      id: 42,
      title: createPostDTO.title,
      description: createPostDTO.description,
      user,
    } as Post;

    when(postRepositoryMock.save(anything())).thenResolve(savedPost);

    const result: Result<Post> = await postService.create(createPostDTO);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(savedPost);

    verify(
      userRepositoryMock.findOneBy(deepEqual({ id: createPostDTO.userId })),
    ).once();
    verify(postRepositoryMock.save(anything())).once();
  });

  it("should fail to create a post when the user does not exist", async () => {
    const createPostDTO: CreatePostDTO = {
      title: "Outro post",
      description: "Outra descrição de teste",
      userId: 123,
    };

    when(
      userRepositoryMock.findOneBy(deepEqual({ id: createPostDTO.userId })),
    ).thenResolve(null);

    const result: Result<Post> = await postService.create(createPostDTO);

    expect(result.success).toBe(false);
    expect(result.error).toEqual({
      message: "User not exists",
      code: "INVALID_INPUT",
    });

    verify(
      userRepositoryMock.findOneBy(deepEqual({ id: createPostDTO.userId })),
    ).once();
    verify(postRepositoryMock.save(anything())).never();
  });

  it("should return an internal server error when an exception occurs", async () => {
    const createPostDTO: CreatePostDTO = {
      title: "Post error",
      description: "Post descrição com error",
      userId: 1,
    };

    when(
      userRepositoryMock.findOneBy(deepEqual({ id: createPostDTO.userId })),
    ).thenReject(new Error("Database error"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result: Result<Post> = await postService.create(createPostDTO);

    expect(result.success).toBe(false);
    expect(result.error).toEqual({
      message: "Internal server error",
      code: "SERVER_ERROR",
    });

    verify(
      userRepositoryMock.findOneBy(deepEqual({ id: createPostDTO.userId })),
    ).once();
    verify(postRepositoryMock.save(anything())).never();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error creating post:",
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });
});
