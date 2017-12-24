# Code Challenge

## Deployment

The project is configured to be deployed on Heroku.
The web application and the api server can be accessed by the following link:
[https://rdtracker.herokuapp.com/](https://rdtracker.herokuapp.com/)

The tracked client website can be accessed on:
[http://rd.toplayalong.com/](http://rd.toplayalong.com/)

## Folder Structure

The main folder holds the Express server that delivery the static
content from the following folders: 
- `client`: The web application that displays the visited pages;
- `tracker`: The javascript library to be inserted on the pages that
will be tracked by the application;
- `website`: A example website used for test during development.

The main folder is also the API server that collects the data sent by
the javascript library inserted on pages.

## Available Commands

### From Main Folder

- `npm start` - run the server to serve the client folder content, meant to be used in production
- `npm run dev` - run the api server in debug mode, the client HMR React server and watch for changes
on tracker folder.
- `npm run build` - create a production ready build for the application in  `client/dist` folder
and build the tracker library and copy to the `public` folder
- `npm test` - run server tests in watch mode

### From Client Folder

- `npm clean` - delete the dist folder
- `npm test` - run all client tests
- `npm run test:watch` - run all client tests in watch mode

### Database Factory Commands (from `factory folder)

- `node populate exec` - generate records to populate the application database
- `node drop exec` - drop all collections (can also be executed via POST /api/factory/drop)


## List of Third-Party Libraries

### All
- Jest

### Server
- Express
- Mongoose
- Cors
- Body-parser
- Moment
- Lodash
- Dotenv
- Nodemon
- Supertest
- Lodash

### Web Application (client folder)
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

## TODO

- Continuous Integration
- Lint server and tracker
