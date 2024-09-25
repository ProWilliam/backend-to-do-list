# Todo List Backend with Node.js, Express and TypeScript


This is a backend for a task management application (Todo List), developed with Node.js, Express, TypeScript and MongoDB. JWT is used for user authentication and securing routes.

## Requirements
Before you begin, make sure you have the following installed on your system:

- Node.js (version 21.4 or higher)
- npm or yarn to manage dependencies
- MongoDB (either on-premises or through a MongoDB service such as MongoDB Atlas)
- Insomnia, Postman or any client for HTTP testing

## Install

1. Clone the repository.


2. Install dependencies.
Use the following command to install the project dependencies:
```
npm install
```

or if you prefer yarn:
```
yarn install
```

3. Configure environment variables.
Create a .env file in the project root with the following structure:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-db
JWT_SECRET=tu_secreto_jwt
```

PORT: The port on which the server will run.
MONGO_URI: The URL of your MongoDB database.
JWT_SECRET: The secret key used to sign and verify JWT tokens.

4. Run the project
Use the following command to run the server in development mode:

```
npm run dev
```

or with yarn:
```
yarn dev
```
This will start the server at http://localhost:5000.

## API usage
1. Authentication
To access most API routes, you need to authenticate using JWT. The steps are as follows:

2. Get a JWT Token
You can implement an authentication route to obtain the token, or do it manually while developing. Use this token in the headers of requests that require authentication.

3. Authenticate using the JWT token
When making requests to protected routes, you must include the token in the request header:

```
Authorization: YOUR_JWT_TOKEN
```

## Endpoints

The available routes are described below:

Create a task and its body is in json format.
```
URL: /todo
Método: POST
Autenticación: Yes (JWT)
{
  "text": "Task description"
}
```

Getting the authenticated user's tasks returns an array of objects.
```
URL: /todo
Método: GET
Autenticación: Yes (JWT)
[
  {
    "_id": "id_of_the_task",
    "text": "Task description",
    "user": "id_of_the_user",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

Update a task and return the task update
```
URL: /todo/:id
Método: PUT
Autenticación: Yes (JWT)
{
  "text": "Updated task description"
}
```

Deleting a task returns response 204
```
URL: /todo/:id
Método: DELETE
Autenticación: Yes (JWT)
```

# Folder Structure
The project follows the following folder structure:

```
.
├── src
│   ├── config
│   │   └── db.ts          # Database configuration
│   ├── middleware
│   │   └── auth.ts        # JWT authentication middleware
│   ├── models
│   │   ├── todo
│   │       └── Todo.ts    # Task Model (All)
|   |   └── user
│   │       └── User.ts    # User Model
│   ├── routes
│   │   ├── auth
│   │   |   └── auth.ts    # API routes for authentication (Auth)
|   |   └── todo
│   │       └── todo.ts    # API routes for tasks (Todo)
│   ├── types
│   │   └── AuthenticatedRequest.d.ts 
│   └── app.ts             # Express server configuration
├── .env                   # Environment variables (ignored by git)
├── package.json           # Dependency configuration
├── tsconfig.json          # TypeScript Settings      
└── README.md              # This file
```

## Scripts

Run the server in development mode.
```
npm run dev    
```

Compiles the TypeScript project to JavaScript.
```
npm run build
```
