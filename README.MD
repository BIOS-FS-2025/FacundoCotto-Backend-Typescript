# Proyecto backend typescript

## Instalation

### Dependencies

```bash
npm install express dotenv morgan chalk bcryptjs jsonwebtoken zod cors axios mongoose swagger-ui-express swagger-jsdoc
```

### Dev Dependencies

```bash
npm install -D typescript @types/express @types/node @types/jsonwebtoken @types/bcryptjs @types/cors 
npm install -D @types/morgan @types/mongoose @types/swagger-ui-express @types/swagger-jsdoc ts-node-dev
```

### Init Typescript
```bash
npx tsc –init
```

### Comands
```bash
npm run dev -> start the project in dev mode
npm run build -> compilation of the project
npm start -> start the project in prodcution mode
```

## [Node JS](https://nodejs.org/en)

Es un entorno de ejecución (runtime environment) de JavaScript de código abierto y multiplataforma 
que permite ejecutar código JavaScript fuera del navegador (principalmente en el servidor).

## [Express](https://expressjs.com)

Un framework web minimalista de Node.js, muy popular para construir APIs y aplicaciones de servidor.

## [Dotenv](https://www.dotenv.org/)

Una librería que carga variables de entorno desde un archivo .env a process.env, manteniendo las 
configuraciones sensibles fuera del código.

## [Morgan](https://www.npmjs.com/package/morgan)

Un middleware para Express que se usa para registrar (logging) detalles de las peticiones HTTP 
en la consola, útil para depuración.

## [Chalk](https://www.npmjs.com/package/chalk)

Una librería simple para dar estilo a la salida de texto en la consola de Node.js con colores.

## [Bcryptjs](http://npmjs.com/package/bcryptjs)

Una librería para hashing de contraseñas; se usa para almacenar contraseñas de forma segura 
en una base de datos.

## [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

Una implementación del estándar JSON Web Token (JWT), utilizada para crear tokens de acceso 
seguros y sin estado para la autenticación de usuarios.

## [Zod](https://zod.dev/)

Una librería de validación de esquemas (schemas) para TypeScript/JavaScript. Permite definir 
la forma de los datos esperados y valida si los datos recibidos cumplen con esa estructura

## [Cors](https://expressjs.com/en/resources/middleware/cors.html)

Un middleware de Express que habilita la Compartición de Recursos de Origen Cruzado (CORS), 
permitiendo que navegadores accedan a la API desde dominios diferentes.

## [Axios](https://axios-http.com/docs/intro)

Una librería popular para realizar peticiones HTTP (clientes) desde el navegador o Node.js.

## [Mongoose](https://mongoosejs.com/)

Es una librería de modelado de objetos para MongoDB (ODM) para Node.js. Proporciona una
 forma orientada a esquemas de interactuar con MongoDB.

## [Swagger](https://swagger.io/)

Es un conjunto de herramientas de código abierto basadas en la especificación OpenAPI, 
que se utiliza para diseñar, construir, documentar y consumir APIs RESTful.