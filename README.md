# Nutshell - Betels

## Description
Nutshell is a new product offering that we were tasked with building. It's a dashboard for people to use to organize their daily weather, events, articles, and chat messages.


## Screenshots
Project Mock Up<img src="./img/Project.png">

## Technologies Used
* Webpack
* Axios
* Firebase
* ES6 Modules
* SASS / CSS
* Bootstrap

## How to run this app
Note: To run this app you will need a firebase account and a new project.

### 1. Configure Firebase
1. Clone the repository to a local machine.
2. Run the following command in terminal to download the web dependencies: `npm install`
3. In the db folder, rename apiKeys.json.example to apiKeys.json.
4. In Firebase, create a new project.
5. Navigate to your config object, and copy the keys from Firebase into the apiKeys.json file.
6. Create a realtime databse in Firebase, and start in test mode.
7. Import the `./db/articles.json` file into the database to seed data.
8. Import the `./db/events.json` file into the database to seed data.
9. Import the `./db/messages.json` file into the database to seed data.
10. Import the `./db/locations.json` file into the database to seed data.

### 2. Serve up the app
* Run `npm start` in your terminal to initiate the app.

## Easiest way to view the app
You can simply visit https://nutshells-betels.firebaseapp.com/ to interact with the app.