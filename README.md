# Train booking system - Group 7
[Live Demo](https://proud-island-0916a2703.azurestaticapps.net/)

# Getting started
Dependencies:
- **NodeJS**
- **React**
- **NestJS**
- **PostgresSQL**
- **TypeScript**

# Initializing the database
Execute ```docker-compose up -d```
inside the root of **/api** to create a brand new docker-container with PostgresSQL **v14.1.0**.

# Setting up projects
Execute ```npm install``` inside **/api**, **/client** & **/shared** to install all packages & dependencies neccessary. And ```npm start``` in their respective directories to boot the projects up on your local machine.

Make sure to setup the ```.env``` file to match the **dockerized** database credentials, as seen [here](https://github.com/AdamBrodin/th2103-g07/blob/main/api/.env.example).
