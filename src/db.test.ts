import axios from 'axios';

const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: `john.doe${Date.now()}@example.com`
};


let userId: number | null = null;


async function testCreateUser() {
  try {
    const response = await axios.post('http://localhost:3000/users', testUser);
    userId = response.data.id;
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
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
    console.log('Post created successfully:', response.data);
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

async function waitForServer(maxAttempts = 5, delayMs = 5000) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await axios.get('http://localhost:3000/health');
      return true;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return false;
}

async function init() {
  await waitForServer();
  const userCreated = await testCreateUser();
  if (userCreated) {
    await testCreatePost();
  }
}

init();