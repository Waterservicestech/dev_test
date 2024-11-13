// src/services/__tests__/postService.test.ts
import { PostService } from "../service/post.service";
import { postRepository } from "../repository/post.repository";
import { userRepository } from "../repository/user.repository";

// Mock do repositório
jest.mock("../repository/post.repository", () => ({
  postRepository: jest.fn(),
}));

jest.mock("../repository/user.repository", () => ({
  userRepository: jest.fn(),
}));

describe("PostService", () => {
  let postService: PostService;
  const mockPostRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };

  const mockUserRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(() => {
    postService = new PostService();

    // Configura os repositórios para retornar os mocks
    (postRepository as jest.Mock).mockReturnValue(mockPostRepository);
    (userRepository as jest.Mock).mockReturnValue(mockUserRepository);

    // Limpar os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it("deve criar um post com sucesso e retornar um id", async () => {
    const postData = {
      userId: 1,
      title: "Post de exemplo",
      description: "Conteúdo do post",
    };

    // Mock de `userRepository` para simular usuário existente
    mockUserRepository.findOneBy.mockResolvedValue({ id: postData.userId });

    // Configura o mock para `postRepository.create` e `save`
    mockPostRepository.create.mockReturnValue({ id: 1, ...postData });
    mockPostRepository.save.mockResolvedValue({ id: 1, ...postData });

    const result = await postService.createPost(postData);

    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
      id: postData.userId,
    });
    expect(mockPostRepository.create).toHaveBeenCalledWith(postData);
    expect(mockPostRepository.save).toHaveBeenCalledWith({
      id: 1,
      ...postData,
    });
    expect(result).toMatchObject({
      id: 1,
      userId: 1,
      title: "Post de exemplo",
      description: "Conteúdo do post",
    });
  });

  it("deve retornar um post pelo ID", async () => {
    const postId = 1;
    const post = {
      id: postId,
      title: "Post de teste",
      description: "Descrição do post",
      userId: 1,
    };

    mockPostRepository.findOneBy.mockResolvedValue(post);

    const result = await postService.getPostById(postId);

    expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ id: postId });
    expect(result).toMatchObject(post);
  });

  it("deve lançar um erro se o post não for encontrado por ID", async () => {
    const postId = 999;

    mockPostRepository.findOneBy.mockResolvedValue(null);

    await expect(postService.getPostById(postId)).rejects.toThrow(
      "Post não encontrado"
    );
    expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ id: postId });
  });

  it("deve deletar um post pelo ID", async () => {
    const postId = 1;
    const post = {
      id: postId,
      title: "Post de teste",
      description: "Descrição do post",
      userId: 1,
    };

    mockPostRepository.findOneBy.mockResolvedValue(post);
    mockPostRepository.remove.mockResolvedValue(post);

    await postService.deletePostById(postId);

    expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ id: postId });
    expect(mockPostRepository.remove).toHaveBeenCalledWith(post);
  });

  it("deve lançar um erro ao tentar deletar um post não existente", async () => {
    const postId = 999;

    mockPostRepository.findOneBy.mockResolvedValue(null);

    await expect(postService.deletePostById(postId)).rejects.toThrow(
      "Post nao encontrado"
    );
    expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ id: postId });
  });
});
