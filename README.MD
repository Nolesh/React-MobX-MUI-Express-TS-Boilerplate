# Welcome to the TypeScript React + MobX + MUI + Express Boilerplate Project!

## Overview

TypeScript-based boilerplate project designed to jumpstart your development of robust and scalable web applications. This boilerplate integrates several powerful technologies to provide a solid foundation for building modern web applications:

- **React**
- **TypeScript**
- **Material-UI (MUI)**
- **MobX**
- **Express**

## Features

- **TypeScript Support**: Enjoy the benefits of static typing, including enhanced code readability, early bug detection, and improved refactoring capabilities.
- **React Components with MUI**: Build user interfaces using React and Material-UI for a consistent and visually appealing design.
- **State Management with MobX**: Leverage MobX for reactive state management, enabling efficient handling of application state changes across components.
- **Webpack Configuration**: Configured Webpack for the frontend, optimized for both development and production environments.
- **Express Backend**: Communicate with a backend server built using Express, enabling you to handle RESTful APIs and perform CRUD operations efficiently.
- **Shared Project**: Includes a shared project for common functionality between client and server. It may contain general functions and types for seamless communication and integration across the application stack.
- **Linting and Testing:** The project includes linting tools to maintain code quality and is covered by tests for both client and server components to ensure reliability.

## MobX Example

This project includes a demonstration of MobX in action, showcasing its capabilities in managing the application's state. Utilize MobX to handle the state of components such as progress bars, snackbars, and theme modes seamlessly.

## To-Do List Example

This boilerplate includes a practical example application: a To-Do List. Learn how to integrate the aforementioned technologies to create a full-stack application.

- **Frontend**: The To-Do List interface is built using React and Material-UI. Users can add, edit, and delete tasks with ease, leveraging MobX for reactive state management.
- **Backend**: The server, built with Express, manages API requests for handling and storing to-do items. Easily extend this setup to include database integration for scalability.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:Nolesh/React-MobX-MUI-Express-TS-Boilerplate.git
   cd React-MobX-MUI-Express-TS-Boilerplate
   ```

2. **Install Dependencies**:
   ```bash
   npm run setup
   ```

3. **Run the Development Server**:
   ```bash
   npm start
   ```

4. **Open the Application**:
    Open your browser and navigate to `http://localhost:3000`

## Project Structure

- **/src**: Contains the React frontend code.
  - **/components**: Reusable React components.
  - **/modules**: Specific modules for organizing and structuring client-side logic.
  - **/stores**: MobX stores for state management.  
  - **/utils**: Utility functions.
- **/server**: Contains the Express backend code.  
  - **/controllers**: Request handlers for the routes.
  - **/middlewares**: Middleware functions for handling requests and responses.
  - **/routes**: API routes for the server.
  - **/utils**: Utility functions.
- **/shared**: Contains common functions and types shared between client and server.
  - **types.ts**: General types for communication between server and client.
  - **routes.ts**: Defines the application's routes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)

## Conclusion

This boilerplate project provides a comprehensive starting point for developing TypeScript-based web applications with React, Material-UI, MobX, and Express. With built-in linting and extensive test coverage, this project ensures code quality and reliability. We hope this example will help you get up and running quickly and inspire you to create amazing applications.

**Happy coding!** 🚀

