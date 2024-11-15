import axios from 'axios';

const testUser = {
  firstName: "Bruna",
  lastName: "Borges",
  email: "brunaborgesrocha668@gmail.com"
};


let userId: number | null = null;

async function testCreateUser() {
  try {
    const response = await axios.post('http://localhost:3000/users', testUser);
    userId = response.data.id;
    console.log('Usuário criado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro na criação do usuário:', error);
  }
}

const testPost = {
  title: "Some message",
  description: "Some description",
  userId: null as number | null
};

async function testCreatePost() {

  testPost.userId = userId;

  try {
    const response = await axios.post('http://localhost:3000/posts', testPost);
    console.log('Post criado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao criar um post:', error);
  }
}

async function init() {
  await testCreateUser();
  await testCreatePost();
}

init();
