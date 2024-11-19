# Dev Test API - Node.js

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Features](#features)
- [Usage](#usage)
    - [Run Server](#run-server)
    - [Test](#test)
- [Endpoints](#endpoints)

## Overview

This is a [Node.js](https://nodejs.org/en) API project built with [TypeScript](https://www.typescriptlang.org/) and [Express](https://expressjs.com/), designed to manage **users**, **posts**, and their relationships. The API interacts with a [MySQL](https://www.mysql.com/) database using [TypeORM](http://typeorm.io/) for data management. Both the API and the database are containerized using [Docker](https://www.docker.com/).

## Requirements

For this project, the following (essential for execution) resources were used:
 - [Node.js](https://nodejs.org/)
 - [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Features

- **Create a user**: A user could be created with `firstName`, `lastName` and `email`. The email field is unique. 
- **Create a post**: A post could be created with `title`, `description` and `userId`. The `userId` establishes a relationship with a user.

## Usage

### Run Server

Build and start containers.

```
docker-compose up --build -d
```

The server will run at port `3000` or the specified port.

### Test

First, access API:

```
docker exec -it dev_test-api-1 /bin/sh
```

And then, run test:

```
npm test
```

## Endpoints
- **POST** - `/users`: Create a new user
    - Data should be sent in the request body in JSON format:
        ```
         {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com"
         }
        ```
    - The return will be the created user object:
        ```
         {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "id": 1
         }
        ```
- **POST** - `/posts`: Create a new post
    - Data should be sent in the request body in JSON format:
        ```
         {
            "title": "Some title",
            "description": "some description",
            "user": "1"
         }
        ```
    - The return will be the created post object:
        ```
         {
            "title": "Some title",
            "description": "some description",
            "user": {
               "id": 1,
               "firstName": "John",
               "lastName": "Doe",
               "email": "john.doe@example.com"
            },
            "id": 1
         }
        ```
