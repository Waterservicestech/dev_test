// src/services/__tests__/userService.test.ts
import { UserService } from "../service/user.service";
import { userRepository } from "../repository/user.repository";

// Cria o mock da função `userRepository` para retornar um objeto simulado com os métodos `findOneBy`, `create` e `save`
jest.mock("../repository/user.repository", () => ({
  userRepository: jest.fn(),
}));

describe("UserService", () => {
  let userService: UserService;
  const mockRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    userService = new UserService();

    // Configura `userRepository` para retornar `mockRepository`
    (userRepository as jest.Mock).mockReturnValue(mockRepository);

    // Limpar os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it("deve criar um usuário com sucesso e retornar um id", async () => {
    const userData = {
      firstName: "João",
      lastName: "Doe",
      email: "joao@example.com",
    };

    // Configura o mock para que `findOneBy` retorne null (sem usuário existente)
    mockRepository.findOneBy.mockResolvedValue(null);
    // Configura o mock para que `create` retorne o objeto usuário com um id
    mockRepository.create.mockReturnValue({ id: 1, ...userData });
    // Configura o mock para que `save` retorne o usuário salvo
    mockRepository.save.mockResolvedValue({ id: 1, ...userData });

    const result = await userService.createUser(userData);

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({
      email: userData.email,
    });
    expect(mockRepository.create).toHaveBeenCalledWith(userData);
    expect(mockRepository.save).toHaveBeenCalledWith({ id: 1, ...userData });
    expect(result).toMatchObject({
      id: 1,
      firstName: "João",
      lastName: "Doe",
      email: "joao@example.com",
    });
  });

  it("deve lançar um erro se o email já estiver em uso", async () => {
    const userData = {
      firstName: "João",
      lastName: "Doe",
      email: "joao@example.com",
    };

    // Configura o mock para que `findOneBy` retorne um usuário existente
    mockRepository.findOneBy.mockResolvedValue({ id: 1, ...userData });

    await expect(userService.createUser(userData)).rejects.toThrow(
      "Email já está em uso"
    );

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({
      email: userData.email,
    });
    expect(mockRepository.create).not.toHaveBeenCalled();
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it("deve retornar uma lista de usuários", async () => {
    const users = [
      { id: 1, firstName: "João", lastName: "Doe", email: "joao@example.com" },
      {
        id: 2,
        firstName: "Maria",
        lastName: "Santos",
        email: "maria@example.com",
      },
    ];

    // Configura o mock para que `find` retorne a lista de usuários
    mockRepository.find.mockResolvedValue(users);

    const result = await userService.getUsers();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it("deve retornar um usuário por ID", async () => {
    const userId = 1;
    const user = {
      id: userId,
      firstName: "João",
      lastName: "Doe",
      email: "joao@example.com",
    };

    // Configura o mock para que `findOneBy` retorne o usuário correspondente ao ID
    mockRepository.findOneBy.mockResolvedValue(user);

    const result = await userService.getUserById(userId);

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(result).toEqual(user);
  });

  it("deve deletar um usuário por ID", async () => {
    const userId = 1;

    // Configura o mock para que `findOneBy` retorne o usuário correspondente ao ID
    mockRepository.findOneBy.mockResolvedValue({ id: userId });

    // Configura o mock para que `remove` seja chamado com o usuário encontrado
    mockRepository.remove.mockResolvedValue(undefined);

    await userService.deleteUserById(userId);

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(mockRepository.remove).toHaveBeenCalledWith({ id: userId });
  });
});
