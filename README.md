# Code Challenge

## Deployment

The project is configured to be deployed on Heroku.
The web application and the api server can be accessed by the following link:
[https://rdtracker.herokuapp.com/](https://rdtracker.herokuapp.com/)

The tracked client website can be accessed on:
[http://rd.toplayalong.com/](http://rd.toplayalong.com/)

## Folder Structure

The main folder holds the Express server that delivery the static
content from the folders: 
- `client`: The web application that displays the visited pages;
- `tracker`: The javascript library to be inserted on the pages that
will be tracked by the application;
- `website`: A example website used for test during developement.

The main folder is also the API server that collects the data sent by
the javascript library inserted on pages.

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
- `npm run dev` - run the api server in debug mode, the client HMR React server and watch for changes
on tracker folder.
- `npm run build` - create a production ready build for the application in  `client/dist` folder
and build the tracker library and copy to the `public` folder
- `npm test` - run all server tests
- `npm run test:watch` - run all server tests in watch mode

### From Client Folder

- `npm clean` - delete the dist folder
- `npm test` - run all client tests
- `npm run test:watch` - run all client tests in watch mode


## List of Third-Party Libraries

### All
- Jest

### Server
- Express
- Dotenv
- Nodemon
- Supertest
- Lodash

### Webapp (client folder)
- React
- React-router
- Webpack 
- Axios
- Moment
- React-syntax-highlighter
- Semantic-UI

### Tracker (tracker folder)
- Webpack
- Universal-cookie
- Axios
