# Environment Setup

This was developed using Node.js version 18 and PostgreSQL version 15. While this isn't a strict requirement, it may be beneficial to mimic the setup to avoid any potential issues running the API.

You'll also want to create a users table in your database. The structure should be similar to the following:

```
CREATE TABLE
  public.users (
    id uuid NOT NULL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
  );
```

Additionally in order for the app to connect to the database, you'll want to specify the following environment variable and set it to the connection string required to connect to the database:

```
export PG_CONNECTION=postgresql://user:password@localhost:5432/postgres
```

# Install Dependencies

Use `npm` to install the required dependencies:

```
npm install
```

# Dev

Run the `dev` command to start the API in dev mode. This will let you make any changes to the API and have the server be restarted automatically:

```
npm run dev
```

By default the API will run on port 3000. But you can override this by setting the `PORT` environment variable.

# Tests

There are some integration test cases that have been written using Jest. They can be located under the `tests/` directory. To run them, simply execute the following command:

```
npx jest
```

**Note**: Consider using a different `PG_CONNECTION` connection string for testing to avoid cluttering your main database.

# API

Below is a list of the API endpoints available, along with the details of the interface.
If an endpoint requires authentication, you are expected to create a JWT and pass it in the `Authorization` header like so:

```
Authorization: Bearer [JWT_HERE]
```

## Tokens

### Creating a JWT

This endpoint accepts user credentials and returns a JWT which you can then use to access endpoints that are protected.

#### Request

```
POST /tokens

{
    "email": "user@email.td",
    "password": "123456789"
}
```

#### Response

```
200 OK

{
    "token": "..."
}
```

## Users

### Creating a user

This endpoint lets you create a new user. No authentication is necessary.

#### Request

```
POST /users

{
    "name": "new user",
    "email": "user@fake.tld",
    "password": "123456789"
}
```

#### Response

```
200 OK

{
    "id": "...",
    "name: "new user",
    "email": "user@fake.tld"
}
```

### Retrieving a user

This endpoint lets you retrieve the details of the given user. Authentication is required.

#### Request

```
GET /users/:id
```

#### Response

```
200 OK

{
    "id": "...",
    "name: "new user",
    "email": "user@fake.tld"
}
```

### Updating a user

This endpoint lets you update the record of the given user. Authentication is required. Additionally, you can only update the user that matches your JWT.

#### Request

```
PATCH /users/:id

{
    "name": "new name",
    "email": "new@email.com",
    "password": "987654321"
}
```

#### Response

```
200 OK

{
    "id": "...",
    "name": "new name",
    "email": "new@email.com"
}
```

### Deleting a user

This endpoint lets you delete the record of the given user. Authentication is required. Additionally, you can only delete the user that matches your JWT.
Deleting a user also invalidates all the JWT signed with that user.

#### Request

```
DELETE /users/:id
```

#### Response

```
204 No Content
```
