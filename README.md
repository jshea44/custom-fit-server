# Custom Fit Server

> Backend server for the Custom Fit website. Allows a user to create/login utilizing Basic and Bearer auth. A user can then create customized workouts with a multitude of measurable metrics and then persist that data in MongoDB Atlas.

## Installation

Install all required dependencies with:

`npm install`

## Usage

Be sure to create a .env file with the following variables:

- `MONGODB_URI` -> Set this to the connection URI for MongoDB Atlas from your account.
- `PORT` -> The default PORT is localhost:3001, set to whichever port is free for you.

To start server:

`npm start`

or

`node server.js`

## Contributors

Joshua Shea

## Resources

ChatGPT 3.5

## License

This backend project is licensed under the [MIT License](LICENSE).
