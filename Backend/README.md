# User Registration Endpoint Documentation

## Endpoint

- **URL:** `/users/register`
- **Method:** `POST`

## Description

This endpoint registers a new user in the system. The user must provide valid data which includes full name, email, and password. On successful registration, the endpoint returns an authentication token and the created user object.

## Request Body

The request body must be a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"  // (optional; if provided, must have a minimum of 2 characters)
  },
  "email": "johndoe@example.com",
  "password": "password123"
}


Workspace

Collecting workspace information

Validation Rules

fullName.firstName: Must be a string with a minimum length of 3 characters.

fullName.lastName: Optional. If provided, must have a minimum length of 2 characters.

email: Must be a valid email address and contain at least 5 characters.

password: Must have a minimum of 6 characters.

Response

Success (HTTP 200)

On successful registration, the response will include:

A JSON web token (token) for authentication.

The created user object (user).

Example successful response:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "johndoe@example.com"
    // other user fields...
  }
}

Validation Error (HTTP 400)

If validation fails (e.g., invalid email, short first name, or short password), the response will include an array of error messages.

Example error response:

{
  "erros": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
    // additional error objects (if any)...
  ]
}