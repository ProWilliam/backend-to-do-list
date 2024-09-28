# Todo List Backend with Node.js, Express, TypeScript, WebSockets, and Testing with Jest


This is a backend for a task management application (Todo List), developed with Node.js, Express, TypeScript, MongoDB, and WebSockets using socket.io. JWT is used for user authentication and route security, and WebSocket support allows for real-time updates, supporting multiple open windows per user. Testing is done using Jest.

## Requirements
Before you begin, make sure you have the following installed on your system:

- Node.js (version 21.4 or higher)
- npm or yarn to manage dependencies
- MongoDB (either on-premises or through a MongoDB service such as MongoDB Atlas)
- Insomnia, Postman or any client for HTTP testing
- WebSocket-compatible client or frontend using socket.io-client for real-time features
- Jest for running unit and integration tests

## Install

1. Clone the repository.

```
git clone https://github.com/ProWilliam/backend-to-do-list.git
```

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
MONGO_URI=mongodb://localhost:27017/todo-db || mongodb+srv://<your_user>:<your_password>@<your_path_cluster>/?retryWrites=true&w=majority&appName=heroku
JWT_SECRET=tu_secreto_jwt
```

PORT: The port on which the server will run.
MONGO_URI: The URL of your MongoDB database in local or remote.
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

## WebSocket Integration with socket.io
The backend now supports WebSocket connections using socket.io to handle real-time features such as broadcasting task updates across multiple windows.

1. WebSocket Client Connection Example
Using socket.io-client, you can connect to the WebSocket server like this:

```
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  query: { token: 'your_jwt_token' },
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('message', (message) => {
  console.log('Received message:', message);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});
```

## Testing with Jest
This project includes unit and integration tests using Jest. The tests cover the functionality of the Express API and WebSocket connections.The configurations are located in the **jest.config.ts** file

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
    "_id": ObjetId("id_of_the_task"),
    "text":"Task description",
    "completed": boolean,
    "user": ObjetId{"id_of_the_user"},
    "__v": 0
  }
]
```

Update a task and return the task update
```
URL: /todo/:id
Método: PUT
Autenticación: Yes (JWT)
{
  "completed": boolean
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
│   │   ├── db.test.ts       # test configuration
│   │   └── db.ts            # Database configuration
│   ├── middleware
│   │   ├── auth.test.ts       
│   │   └── auth.ts          # JWT authentication middleware
│   ├── models
│   │   ├── todo
│   │       ├── Todo.test.ts    
│   │       └── Todo.ts      # Task Model (All)
|   |   └── user
│   │       ├── User.test.ts      
│   │       └── User.ts      # User Model
│   ├── routes
│   │   ├── auth
│   │   |   └── auth.ts      # API routes for authentication (Auth)
|   |   └── todo
│   │       └── todo.ts      # API routes for tasks (Todo)
│   ├── types
│   │   └── AuthenticatedRequest.d.ts 
│   ├── websocket
│   │   └── websocket.ts 
│   └── app.ts               # Express server configuration
├── .env                     # Environment variables (ignored by git)
├── Insomnia_2024-09-24      # Test export file for API (insomnia)
├── package.json             # Dependency configuration
├── tsconfig.json            # TypeScript Settings      
└── Readme.md                # This file
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

Run the Jest test suite.
```
npm run test
```