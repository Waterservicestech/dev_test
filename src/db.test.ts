import axios from 'axios';

const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com"
};


let userId: number | null = null;

async function testCreateUser() {
  try {
    const response = await axios.post('http://localhost:3000/users', testUser);
    userId = response.data.id;
    console.log('User created successfully:', response.data);
  } catch (error) {
    console.error('Error creating user:', (error as any).message);
  }
}

async function testGetUser() {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    console.log('User retrieved successfully:', response.data);
  } catch (error) {
    console.error('Error retrieving user:', (error as any).message);
  }
}

async function testGetUsers() {
  try {
    const response = await axios.get('http://localhost:3000/users');
    console.log('Users retrieved successfully:', response.data);
  } catch (error) {
    console.error('Error retrieving users:', (error as any).message);
  }
}

async function testUpdateUser() {
  try {
    const response = await axios.put(`http://localhost:3000/users/${userId}`, {
      firstName: "Jane",
      lastName: "Doe"
    });
    console.log('User updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating user:', (error as any).message);
  }
}

async function testDeleteUser() {
  try {
    const response = await axios.delete(`http://localhost:3000/users/${userId}`);
    console.log('User deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting user:', (error as any).message);
  }
}

const testPost = {
  title: "Some message",
  description: "Some description",
  userId: null as number | null
};

let postId: number | null = null;


async function testCreatePost() {

  await testCreateUser();

  testPost.userId = userId;

  try {
    const response = await axios.post('http://localhost:3000/posts', testPost);
    postId = response.data.id;
    console.log('Post created successfully:', response.data);
  } catch (error) {
    console.error('Error creating post:', (error as any).message);
  }
}

async function testGetPost() {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${postId}`);
    console.log('Post retrieved successfully:', response.data);
  } catch (error) {
    console.error('Error retrieving post:', (error as any).message);
  }
}

async function testGetPosts() {
  try {
    const response = await axios.get('http://localhost:3000/posts');
    console.log('Posts retrieved successfully:', response.data);
  } catch (error) {
    console.error('Error retrieving posts:', (error as any).message);
  }
}

async function testUpdatePost() {
  try {
    const response = await axios.put(`http://localhost:3000/posts/${postId}`, {
      title: "Another message",
      description: "Another description"
    });
    console.log('Post updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating post:', (error as any).message);
  }
}

async function testDeletePost() {
  try {
    const response = await axios.delete(`http://localhost:3000/posts/${postId}`);
    console.log('Post deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting post:', (error as any).message);
  }
}

async function init() {
  await testCreateUser();
  await testGetUser();
  await testGetUsers();
  await testUpdateUser();
  await testDeleteUser();

  await testCreatePost();
  await testGetPost();
  await testGetPosts();
  await testUpdatePost();
  await testDeletePost();
}

init();
