import axios from 'axios';

const testPost = {
  title: "Hi",
  description: "Beautiful Day!",
  userId: null as number | null,
};

export async function testCreatePost(userId: number | null): Promise<void> {
  testPost.userId = userId;

  try {
    const response = await axios.post("http://0.0.0.0:3000/posts", testPost);
    console.log("Post created successfully:", response.data);
  } catch (error) {
    console.error("Error creating post:", error);
  }
}