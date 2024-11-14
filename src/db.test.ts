import axios from 'axios';

// Define os dados de um usuário de teste
const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com"
};

let userId: number | null = null;  // Variável para armazenar o ID do usuário criado

/**
 * testCreateUser é responsável por criar um novo usuário na aplicação.
 * 
 * A função tenta criar um novo usuário. Se o e-mail já estiver cadastrado, retorna um erro com a mensagem "Usuário já cadastrado".
 * 
 * @returns {void} Não retorna nada, apenas cria o usuário e armazena o ID ou exibe erro.
 */
async function testCreateUser() {
  try {
    // Verifica se o usuário já existe antes de tentar criá-lo
    const existingUserResponse = await axios.get('http://localhost:3000/users');
    const existingUser = existingUserResponse.data.find((user: { email: string }) => user.email === testUser.email);
    
    if (existingUser) {
      console.log("Usuário já cadastrado com o e-mail:", testUser.email);
      userId = existingUser.id;
      return;
    }

    // Tenta criar o novo usuário
    const response = await axios.post('http://localhost:3000/users', testUser);
    userId = response.data.id;
    console.log('User created successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Axios error - Response data:', error.response.data);
        console.error('Axios error - Response status:', error.response.status);
      } else {
        console.error('Axios error - Message:', error.message);
      }
    } else if (error instanceof Error) {
      console.error('Generic error:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
}

// Define os dados de um post de teste, com o campo userId a ser preenchido após a criação do usuário
const testPost = {
  title: "Some message",
  description: "Some description",
  userId: null as number | null
};

/**
 * testCreatePost é responsável por criar um novo post, associando o post ao usuário criado.
 * 
 * A função preenche o campo `userId` do post com o ID do usuário previamente criado e realiza a criação
 * do post enviando os dados para o endpoint da API.
 * 
 * @returns {void} Não retorna nada, apenas cria o post associado ao usuário.
 */
async function testCreatePost() {
  if (userId === null) {
    console.error("Não foi possível criar o post, pois o usuário não foi criado.");
    return;
  }

  testPost.userId = userId;

  try {
    // Envia a solicitação para criar o post
    const response = await axios.post('http://localhost:3000/posts', testPost);
    console.log('Post created successfully:', response.data);
  } catch (error) {
    // Trata erros na criação do post
    if (axios.isAxiosError(error)) {
      console.error('Error creating post:', error.message, error.response?.data || '');
    } else {
      console.error('Unexpected error creating post:', error);
    }
  }
}

/**
 * init é a função principal que chama as funções de criação de usuário e post.
 * 
 * A função espera que o usuário seja criado primeiro, e depois cria o post associado a esse usuário.
 * 
 * @returns {Promise<void>} Retorna uma Promise que aguarda a execução das funções assíncronas.
 */
async function init() {
  await testCreateUser();
  await testCreatePost();
}

init();
