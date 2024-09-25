# Todo List Backend con Node.js, Express y TypeScript


Este es un backend para una aplicación de gestión de tareas (Todo List), desarrollado con Node.js, Express, TypeScript y MongoDB. Se utiliza JWT para la autenticación de usuarios y asegurar las rutas.

## Requisitos
Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:

- Node.js (versión 21.4 o superior)
- npm o yarn para manejar dependencias
- MongoDB (ya sea local o mediante un servicio de MongoDB como MongoDB Atlas)
- Insomnia, Postman o cualquier cliente para realizar pruebas HTTP

## Instalación

1. Clonar el repositorio.

```
git clone https://github.com/tu_usuario/todo-backend.git
cd todo-backend
```

2. Instalar dependencias.
Usa el siguiente comando para instalar las dependencias del proyecto:

```
npm install
```

o si prefieres yarn: 

```
yarn install
```

3. Configurar variables de entorno.
Crea un archivo .env en la raíz del proyecto con la siguiente estructura:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-db
JWT_SECRET=tu_secreto_jwt
```

PORT: El puerto en el que se ejecutará el servidor.
MONGO_URI: La URL de tu base de datos MongoDB.
JWT_SECRET: La clave secreta utilizada para firmar y verificar los tokens JWT.

4. Ejecutar el proyecto
Usa el siguiente comando para ejecutar el servidor en modo desarrollo:

```
npm run dev
```
o con yarn:

```
yarn dev
```
Esto iniciará el servidor en http://localhost:5000.

## Uso de la API
1. Autenticación
Para acceder a la mayoría de las rutas de la API, es necesario autenticarse usando JWT. Los pasos son los siguientes:

2. Obtener un Token JWT
Puedes implementar una ruta de autenticación para obtener el token, o hacerlo manualmente mientras desarrollas. Usa este token en las cabeceras de las solicitudes que necesiten autenticación.

3. Autenticarse usando el token JWT
Al hacer peticiones a rutas protegidas, debes incluir el token en la cabecera de la solicitud:

```
Authorization: YOUR_JWT_TOKEN
```

## Endpoints

A continuación se describen las rutas disponibles:

Crear una tarea y su cuerpo es en formato json.
```
URL: /todo
Método: POST
Autenticación: Sí (JWT)
{
  "text": "Descripción de la tarea"
}
```

Obtener las tareas del usuario autenticado retorna un array de objetos.
```
URL: /todo
Método: GET
Autenticación: Sí (JWT)
[
  {
    "_id": "id_de_la_tarea",
    "text": "Descripción de la tarea",
    "user": "id_del_usuario",
    "createdAt": "fecha",
    "updatedAt": "fecha"
  }
]
```

Actualizar una tarea y retorna la actualizacion de la tarea
```
URL: /todo/:id
Método: PUT
Autenticación: Sí (JWT)
{
  "text": "Descripción actualizada de la tarea"
}
```

Eliminar una tarea retorna respuesta 204
```
URL: /todo/:id
Método: DELETE
Autenticación: Sí (JWT)
```

# Estructura de Carpetas
El proyecto sigue la siguiente estructura de carpetas:

```
.
├── src
│   ├── config
│   │   └── db.ts          # Configuración de la base de datos
│   ├── middleware
│   │   └── auth.ts        # Middleware de autenticación JWT
│   ├── models
│   │   ├── todo
│   │       └── Todo.ts    # Modelo de Tarea (Todo)
|   |   └── user
│   │       └── User.ts    # Modelo de User
│   ├── routes
│   │   ├── auth
│   │   |   └── auth.ts    # Rutas de la API para las autenticarse (Auth)
|   |   └── todo
│   │       └── todo.ts    # Rutas de la API para las tareas (Todo)
│   ├── types
│   │   └── AuthenticatedRequest.d.ts 
│   └── app.ts             # Configuración del servidor Express
├── .env                   # Variables de entorno (ignorado por git)
├── package.json           # Configuración de dependencias
├── tsconfig.json          # Configuración de TypeScript        
└── README.md              # Este archivo
```

## Scripts

Ejecuta el servidor en modo de desarrollo.
```
npm run dev    
```

Compila el proyecto TypeScript en JavaScript.
```
npm run build
```
