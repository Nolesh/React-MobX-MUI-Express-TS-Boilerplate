import React from 'react';
import { Typography } from '@mui/material';

export default function () {
    return (
        <div className='welcome-page-wrapper'>
            <Typography variant="h5">Welcome to the TypeScript React + MobX + MUI + Express Boilerplate Project!</Typography>
            <div className='welcome-page'>
                <Typography variant="h6" style={{ marginBottom: 10 }}>Overview</Typography>
                <Typography variant="body1">
                    TypeScript-based boilerplate project designed to jumpstart your development of robust and scalable web applications.
                    This boilerplate integrates several powerful technologies to provide a solid foundation for building modern web applications:
                </Typography>
                <ul>
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Material-UI (MUI)</li>
                    <li>MobX</li>
                    <li>Express</li>
                </ul>
                <Typography variant="h6" style={{ marginBottom: 5 }}>Features</Typography>
                <ul>
                    <li><b>TypeScript Support:</b> Enjoy the benefits of static typing, including enhanced code readability, early bug detection, and improved refactoring capabilities.</li>
                    <li><b>React Components with MUI:</b> Build user interfaces using React and Material-UI for a consistent and visually appealing design.</li>
                    <li><b>State Management with MobX:</b> Manage your application's state seamlessly with MobX, making your state logic simple and intuitive.</li>
                    <li><b>Webpack Configuration:</b> Configured Webpack for the frontend, optimized for both development and production environments.</li>
                    <li><b>Express Backend:</b> Communicate with a backend server built using Express, enabling you to handle RESTful APIs and perform CRUD operations efficiently.</li>
                    <li><b>Shared Project:</b> Includes a shared project for common functionality between client and server. It may contain general functions and types for seamless communication and integration across the application stack.</li>
                    <li><b>Linting and Testing:</b> The project includes linting tools to maintain code quality and is covered by tests for both client and server components to ensure reliability.</li>
                </ul>
                <Typography variant="h6" style={{ marginBottom: 5 }}>MobX Example</Typography>
                <Typography variant="body1">
                    This project includes a demonstration of MobX in action, showcasing its capabilities in managing the application's state.
                    Utilize MobX to handle the state of components such as progress bars, snackbars, and theme modes seamlessly.
                </Typography>
                <Typography variant="h6" style={{ marginBottom: 5, marginTop: 15 }}>To-Do List Example</Typography>
                <Typography variant="body1">
                    This boilerplate comes with a practical example application: a To-Do List.
                    This example demonstrates how to integrate the aforementioned technologies to create a full-stack application.
                </Typography>
                <ul>
                    <li><b>Frontend:</b> The To-Do List interface is built using React and Material-UI. Users can add, edit, and delete tasks.</li>
                    <li><b>Backend:</b> The server, built with Express, handles API requests to manage the to-do items. The server stores tasks in a simple JSON file, but it can be easily extended to use a database.</li>
                </ul>
            </div>
        </div>
    )
}