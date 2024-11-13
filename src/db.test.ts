import axios from 'axios';

// o email é uma entidade única, favor não repetir
const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com"
};


let userId: number | null = null;

async function testCreateUser() {
  try {
    const response = await axios.post('http://localhost:3000/api/users', testUser);
    userId = response.data.id;
    console.log('User created successfully:', response.data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// insira o userdId para ter um bom retorno
const testPost = {
  title: "Some message",
  description: "Some description",
  userId: null as number | null
};

async function testCreatePost() {

  testPost.userId = userId;

  try {
    const response = await axios.post('http://localhost:3000/api/posts', testPost);
    console.log('Post created successfully:', response.data);
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

async function init() {
  await testCreateUser();
  await testCreatePost();
}

init();
