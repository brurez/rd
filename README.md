# React / NodeJS API Boilerplate

## Deployment

The project is configured to be deployed on Heroku.

## Folder Structure

The main folder holds the Express server that delivery the static
content from `client` folder and also works as an API server if needed
by the React application.

The `client` folder holds the React application, the necessary tools
to build it and a HMR development server.


This nested folder structure besides it's relative complexity
is often the better solution. Some advantages:
- Encapsulation of building tools, testing and related code quality helpers
like lint.
- The possibility of add more client folders to incorporate a mobile
phone app for example or others clients that would use the same API offered
by the server.

## Available Commands

### From Main Folder

- `npm start` - run the server to serve the client folder content, meant to be used in production
- `npm run dev` - run the server in debug mode and the client using webpack-dev-server
- `npm run build` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check on server files
- `npm test` - run all server tests
- `npm run test:watch` - run all server tests in watch mode

### From Client Folder

- `npm clean` - delete the dist folder
- `npm run lint` - execute an eslint check in the client folder
- `npm test` - run all client tests
- `npm run test:watch` - run all client tests in watch mode
- `npm run coverage` - generate code coverage report in the `coverage` folder


## List of Third-Party Libraries

### Both
- Eslint
- Jest

### Server
- Express
- Dotenv
- Nodemon
- Supertest

### Client
- React
- React-router
- Webpack
- Webpack Extensions
- Enzyme
