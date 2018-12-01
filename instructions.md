# Nutshell Instructions

Nutshell is a new product offering that you have been tasked with building. It's a dashboard for people to use to organize their daily weather, events, articles, friends, and chat messages.

You will be utilizing all of the skills and concepts that you've learned up to this point in the course.

1. Functions
1. Databases/API/HTTP verbs
1. Github
1. Objects
1. CSS
1. Handling user events
1. Data entry/editing
1. Modular development
1. Task automation: bundling with webpack and linting
1. Relational data

## Firebase
Your team should have 1 firebase project that is created through github projects.  Your firebase should have the following 4 collections:
```
/articles
/events
/weather
/messages
```

Each collection should have data in the following structure:
### Messages

```json
{
    "userUid": "5ykBb0xyadPZLgH4EPO4i88HIql2",
    "message": "What's up?",
    "timestamp": 1528763298535,
    "isEdited": true
}
```

### Articles

```json
{
    "userUid": "5ykBb0xyadPZLgH4EPO4i88HIql2",
    "url": "https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/",
    "title": "Wormholes Allow Information to Escape Black Holes",
    "synopsis": "Check out this recent discovery about workholes"
}
```

### Weather

```json
{
    "userUid": "5ykBb0xyadPZLgH4EPO4i88HIql2",
    "zipcode": 37209,
    "isCurrent": true
}
```

### Events

```json
{
    "userUid": "5ykBb0xyadPZLgH4EPO4i88HIql2",
    "event": "Bonfire at the beach",
    "startDate": 1528763298535,
    "location": "Ocean Beach"
}
```

## Division of Labor
This project will consist of 4 modules or dashboard components (messages, articles, events, weather).  Each module involves doing complete CRUD on the collection it is named after.  Each member of your team will be responsible for a module.

Once a team member has claimed a module they are responsible for writing EVER SINGLE bit of code for that module.  If they require help your team should do some pair programming but the person who owns the module should do ALL THE TYPING.

There should be NO gitcidents because each team member should be working in a folder named after their module.  For example if I am working on the weather module I would have a file structure like:

```js
- src/
  - index.js
  - components/
    - weather/
      - weather.js
      - weather.scss
```

Your team will need to closely collaborate on authentication and determining how to pull together all the modules to display them on the dashboard.

## Professional Requirements

1. All teammates must be using webpack to run ESLint
1. Each module should have a comment at the top with the following info: author and purpose of module
1. The README for your project should include instructions on how another person can download and run the application
1. You should be writing tickets and moving them along a github project board
1. The project should be deployed to firebase
