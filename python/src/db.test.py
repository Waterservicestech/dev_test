import unittest
import json
import requests
import time

class TestAPI(unittest.TestCase):

    BASE_URL = "http://localhost:5000"
    
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_get_users(self):
        response = requests.get(f"{self.BASE_URL}/users")
        self.assertEqual(response.status_code, 200)

        users = response.json()
        self.assertIsInstance(users, list)

        if users:
            self.assertIn('firstname', users[0])
            self.assertIn('lastname', users[0])
            self.assertIn('email', users[0])

    def test_get_posts(self):
        user_data = {
            "firstName": "Teste Nome", 
            "lastName": "Teste Sobrenome", 
            "email": "teste.email"}
        create_user_response = requests.post(f"{self.BASE_URL}/users", json=user_data)
                
        self.assertEqual(create_user_response.status_code, 201)
        user = create_user_response.json()

        self.assertIn('id', user)

        post_data = {
            "title": "Test Post",
            "description": "Teste descrição post.",
            "userId": user['id']
        }
        create_post_response = requests.post(f"{self.BASE_URL}/posts", json=post_data)
        self.assertEqual(create_post_response.status_code, 201)
        post = create_post_response.json()

        response = requests.get(f"{self.BASE_URL}/posts?userId={user['id']}")
        self.assertEqual(response.status_code, 200)

        posts = response.json()
        self.assertIsInstance(posts, list)
        self.assertGreater(len(posts), 0)
        self.assertEqual(posts[0]['title'], post['title'])

    def test_post_user_missing_fields(self):
        user_data = {
            "firstname": "Jane",
            "lastname": "Doe"
        }
        response = requests.post(f"{self.BASE_URL}/users", json=user_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("Missing required fields", response.text)

    def test_post_post_missing_fields(self):
        post_data = {
            "title": "Post without description"
        }
        response = requests.post(f"{self.BASE_URL}/posts", json=post_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("Missing required fields", response.text)

    def test_get_posts_user_id_required(self):
        response = requests.get(f"{self.BASE_URL}/posts")
        self.assertEqual(response.status_code, 400)
        self.assertIn("userId is required", response.text)

if __name__ == '__main__':
    time.sleep(2)
    unittest.main()
