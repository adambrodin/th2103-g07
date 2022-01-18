# Train booking system - Group 7

[Live Demo](https://proud-island-0916a2703.azurestaticapps.net/)

# Getting started

Dependencies:

- **NodeJS**
- **React**
- **NestJS**
- **PostgresSQL**
- **TypeScript**

## Initializing the database

Execute `docker-compose up`
inside the root of **/api** to create a new docker-container with PostgresSQL **v14.1.0**.

## **Setting up environment variables**

Create a new `.env` file inside **/api** and **/client** with data that matches their `.env.example`.

## **Setting up the projects**

Execute `npm install` inside **/api**, **/client** and **/shared** respectively to install all packages & dependencies neccessary. And `npm start` to start the projects on your local machine.

# Project structure

# API

The API uses NestJS and utilizes the MVC pattern to structure its code. This means code is split up between controllers, entities and services.

## **Mockdata**

In order to test and develop the application in a non-production environment you will need to add soem mockdata to the database. The database will automatically get filled up with mockdata from **Trafikverket** on the initial startup, this is done [here](https://github.com/adambrodin/th2103-g07/blob/main/api/src/misc/train-data-importer.ts).

-**MAKE SURE YOU HAVE PROVIDED A TRAFIKVERKET API KEY FOR THIS TO WORK**

Alternatively if you wish to provide your own testing data, you can do so by filling up the database **BEFORE** its initial launch.

## **Controllers**

All controllers use a prefixed `/api` route.

### **BookingController**

This controller is responsible for all logic regarding finding and booking trips.

- **/booking/search** (POST) - finds available trips
- **/booking/reservation** (POST) - books a trip
- **/booking** (POST) - find previously booked trip
- **/booking/cancel** (POST) - cancel a previously booked trip
- **/booking/create-checkout-session** (POST) - initializes a checkout session via Stripe

### **StationController**

This controller is responsible for simple logic regarding station data.

- **/station** (GET) - finds all available trainstations

### **StripeController**

This controller is responsible for fetching data about an existing/completed checkout session.

- **/payment/:sessionId** (GET) - fetches checkout data from Stripe sessionId

# Client

The frontend/client is powered by **React** and its logic is split up by pages & components.
Data is passed between "phases" of the booking via a **BookingContext**.

# Deployment

Deployment is done automatically via **CI/CD** workflows found in **./github**. All deployment & cloud logic is handled on **Azure**. Deployment is automatically triggered with pushes to the **/main** branch.

- **API** - deployed as a **Serverless Function App**
- **client** - deployed as a **Static Web App**
- **database** - deployed as a **Azure Postgres Server**
