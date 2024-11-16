import { testCreateUser } from '../db.usersTest';
import { testCreatePost } from '../db.postsTest';

async function runTests() {
  console.log("Starting tests...");

  // Primeiro, cria o usuário e obtém o ID
  const userId = await testCreateUser();

  if (userId !== null) {
    console.log(`User created with ID: ${userId}`);
    // Em seguida, cria o post associado ao usuário
    await testCreatePost(userId);
  } else {
    console.error("User creation failed. Skipping post creation.");
  }

  console.log("Tests completed.");
}

runTests();