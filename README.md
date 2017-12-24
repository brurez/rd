# Code Challenge

## It's Online!

- Web App: [https://rdtracker.herokuapp.com/](https://rdtracker.herokuapp.com/)
- Example Website: [http://rd.toplayalong.com/](http://rd.toplayalong.com/)

## How It Works
A full explanation of how to use the tracker in any website can be found on:
[https://rdtracker.herokuapp.com/howto](https://rdtracker.herokuapp.com/howto)

Basically inserting the script from https://rdtracker.herokuapp.com/public/tracker.js 
in our website makes the Web Application to log all visits.
If the user is nor registered all visits are shown as anonymous in the App.
After the user registers with his name and email, all the visits he has made and
the ones that he will do appear in the application with his associated with his email and name.

## Local Development Setup
For development on local machine, rename the two .env.development to .env
on `tracker/` and `/` directories.

To start dev server run `npm run dev` to start

## Deployment

The project is configured to be deployed and built automatically on Heroku.
Enviroment variables on the server must be configured as in the two .env.development files.

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
- `npm run heroku-postbuild` - create a production ready build for the application in  `client/dist` folder
and build the tracker library and copy to the `public` folder
- `npm test` - run server tests in watch mode

### From Client Folder (Web App)

- `npm start` - start webpack-dev-server
- `npm build` - build production files and copy to `client/build`
- `npm test` - run all client tests in watch mode

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
- Coverage
