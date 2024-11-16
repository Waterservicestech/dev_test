import os
import json
import psycopg2
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from dotenv import load_dotenv

load_dotenv()

def connect_db():
    dbname = os.getenv("DB_NAME")
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT")

    if not all([dbname, user, password, host, port]):
        raise ValueError("One or more required environment variables are missing")

    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        return conn
    except Exception as e:
        raise

def convert_to_camel_case(snake_str):
    components = snake_str.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

def format_response(data):
    return {convert_to_camel_case(k): v for k, v in data.items()}

def get_users():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM "user"')
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return [format_response(dict(zip([desc[0] for desc in cursor.description], row))) for row in users]

def get_posts(userId):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM "post" WHERE userId = %s', (userId,))
    posts = cursor.fetchall()
    cursor.close()
    conn.close()
    return [format_response(dict(zip([desc[0] for desc in cursor.description], row))) for row in posts]

def insert_user(firstName, lastName, email):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO "user" (firstName, lastName, email) VALUES (%s, %s, %s) RETURNING *', 
                   (firstName, lastName, email))
    user = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    return format_response(dict(zip([desc[0] for desc in cursor.description], user)))

def insert_post(title, description, userId):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO "post" (title, description, userId) VALUES (%s, %s, %s) RETURNING *', 
                   (title, description, userId))
    post = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    return format_response(dict(zip([desc[0] for desc in cursor.description], post)))

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == '/users':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            users = get_users()
            self.wfile.write(json.dumps(users).encode())
        elif parsed_path.path.startswith('/posts'):
            query_params = parse_qs(parsed_path.query)
            userId = query_params.get('userId', [None])[0]
            if userId:
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                posts = get_posts(userId)
                self.wfile.write(json.dumps(posts).encode())
            else:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"message": "userId is required"}')
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"message": "Route not found"}')

    def do_POST(self):
        parsed_path = urlparse(self.path)
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        try:
            data = json.loads(post_data)
        except json.JSONDecodeError:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'{"message": "Invalid JSON"}')
            return

        if parsed_path.path == '/users':
            firstName = data.get('firstName')
            lastName = data.get('lastName')
            email = data.get('email')
            
            if not all([firstName, lastName, email]):
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"message": "Missing required fields"}')
                return
            
            user = insert_user(firstName, lastName, email)
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(user).encode())

        elif parsed_path.path == '/posts':
            title = data.get('title')
            description = data.get('description')
            userId = data.get('userId')
            
            if not all([title, description, userId]):
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"message": "Missing required fields"}')
                return

            post = insert_post(title, description, userId)
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(post).encode())

        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"message": "Route not found"}')

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == '__main__':
    run()
