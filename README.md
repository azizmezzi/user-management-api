
# User platform 
## Description

This project is a NestJS-based API that provides user management functionality using GraphQL and Postgres. The API allows for creating, reading, updating, and deleting users, as well as retrieving user information and performing authentication using JSON Web Tokens (JWT).

The API uses a Postgres database to store user information, and provides a GraphQL interface for querying and manipulating user data. It uses the TypeORM library for ORM functionality, and includes a custom GraphQL resolver and service layer for handling user-related logic.

## Getting Started
To run the API, first clone the repository and install the necessary dependencies:


```bash
git clone https://github.com/azizmezzi/user-management-api.git
cd user-management-api
npm install
```

Next, create a .env file in the root directory of the project and add the necessary environment variables for connecting to your Postgres database. You can use the .env.example file as a starting point.

### Running Migrations


Before starting the API, you need to apply the database migrations. To do this, run the following command:

```bash

npm run migration:run

```
This command will apply any pending migrations to the database specified in the .env file. 

### start project

Once you have set up your database, you can start the API using the start:dev command:
```bash

npm run start:dev

```

This will start the API on http://localhost:3000/graphql.

## API Documentation

The API provides a GraphQL interface for querying and manipulating user data. You can access the API documentation by navigating to http://localhost:3000/graphql in your browser.


## Testing

To run the tests for the API, use the test command:

```bash

npm run test

```

This will run the unit tests for the API and output the results to the console.

