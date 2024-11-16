// src/services/UserService.test.ts

import { describe, it, expect, beforeEach, vi } from "vitest";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { Result } from "../utils/types";
import { mock, instance, when, verify, anything, deepEqual } from "ts-mockito";
import { CreateUserDTO, UserService } from "./userService";

describe("UserService", () => {
  let userRepositoryMock: Repository<User>;
  let userService: UserService;

  beforeEach(() => {
    userRepositoryMock = mock<Repository<User>>();
    userService = new UserService({
      userRepository: instance(userRepositoryMock),
    });
  });

  it("should successfully create a user when the email is not already registered", async () => {
    const createUserDTO: CreateUserDTO = {
      firstName: "João",
      lastName: "Silva",
      email: "joao.silva@example.com",
    };

    when(
      userRepositoryMock.findOneBy(deepEqual({ email: createUserDTO.email })),
    ).thenResolve(null);

    const savedUser: User = {
      id: 1,
      firstName: createUserDTO.firstName,
      lastName: createUserDTO.lastName,
      email: createUserDTO.email,
    } as User;

    when(userRepositoryMock.save(anything())).thenResolve(savedUser);

    const result = await userService.create(createUserDTO);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(savedUser);

    verify(
      userRepositoryMock.findOneBy(deepEqual({ email: createUserDTO.email })),
    ).once();
    verify(userRepositoryMock.save(anything())).once();
  });

  it("should fail to create a user when the email is already registered", async () => {
    const createUserDTO: CreateUserDTO = {
      firstName: "Maria",
      lastName: "Fernandes",
      email: "maria.fernandes@example.com",
    };

    const existingUser: User = {
      id: 2,
      firstName: "Maria",
      lastName: "Fernandes",
      email: createUserDTO.email,
    } as User;

    when(
      userRepositoryMock.findOneBy(deepEqual({ email: createUserDTO.email })),
    ).thenResolve(existingUser);

    const result: Result<User> = await userService.create(createUserDTO);

    expect(result.success).toBe(false);
    expect(result.error).toEqual({
      message: "Email already registered, should be unique.",
      code: "EMAIL_ALREADY_REGISTERED",
    });

    verify(
      userRepositoryMock.findOneBy(deepEqual({ email: createUserDTO.email })),
    ).once();
    verify(userRepositoryMock.save(anything())).never();
  });

  it("should return an internal server error when an exception occurs", async () => {
    const createUserDTO: CreateUserDTO = {
      firstName: "Pedro",
      lastName: "Almeida",
      email: "pedro.almeida@example.com",
    };

    when(
      userRepositoryMock.findOneBy(deepEqual({ email: createUserDTO.email })),
    ).thenReject(new Error("Database error"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result: Result<User> = await userService.create(createUserDTO);

    expect(result.success).toBe(false);
    expect(result.error).toEqual({
      message: "Internal server error",
      code: "SERVER_ERROR",
    });

    verify(
      userRepositoryMock.findOneBy(deepEqual({ email: createUserDTO.email })),
    ).once();
    verify(userRepositoryMock.save(anything())).never();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error creating user:",
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });
});
