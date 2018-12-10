# Nutshell - Betels

## Description
Nutshell is a new product offering that we were tasked with building. It's a dashboard for people to use to organize their daily weather, events, articles, and chat messages.


## Screenshots
<img width="1440" alt="screen shot 2018-12-10 at 5 23 30 pm" src="https://user-images.githubusercontent.com/16019344/49768040-76a08b80-fca0-11e8-9a5e-f7532a5c02a6.png">
<img width="1435" alt="screen shot 2018-12-10 at 5 23 41 pm" src="https://user-images.githubusercontent.com/16019344/49768044-799b7c00-fca0-11e8-9fa7-ec8b906666cd.png">
<img width="710" alt="screen shot 2018-12-10 at 5 23 51 pm" src="https://user-images.githubusercontent.com/16019344/49768045-7c966c80-fca0-11e8-916b-13fe9efe1bcc.png">
<img width="1436" alt="screen shot 2018-12-10 at 5 24 05 pm" src="https://user-images.githubusercontent.com/16019344/49768048-7f915d00-fca0-11e8-97a3-46a4d83104b3.png">

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
