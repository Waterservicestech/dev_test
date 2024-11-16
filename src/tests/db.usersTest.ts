import axios from 'axios';

interface UserResponse {
  id: number;
}

const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

let userId: number | null = null;

export async function testCreateUser(): Promise<number | null> {
  try {
    const response = await axios.post<UserResponse>('http://0.0.0.0:3000/users', testUser);
    userId = response.data.id;
    console.log('User created successfully:', response.data);
    return userId;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}