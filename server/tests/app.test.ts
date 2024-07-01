// test/server.test.ts
import request from 'supertest';
// import { APP_PORT, TODO_FILE_PATH } from "../src/config";
// import { IncomingMessage, Server, ServerResponse } from 'http';
import { Express } from "express";

import { createToDoListFileSync } from '../src/utils';
import createApp from '../src/app';


jest.mock('../src/utils', () => ({
    createToDoListFileSync: jest.fn()
}));


describe('App Integration Tests', () => {
    const toDoListFilePath = 'path/to/todolist.json';
    let app: Express;
    let originalConsoleError: typeof console.error;

    beforeAll(() => {
        app = createApp(toDoListFilePath);
        // Supress error
        originalConsoleError = console.error;
        console.error = jest.fn();
    });

    afterAll(() => {
        // Restore the original console.error function after all tests
        console.error = originalConsoleError;
      });

    it('should call createToDoListFileSync on initialization', () => {
        expect(createToDoListFileSync).toHaveBeenCalledTimes(1);
        expect(createToDoListFileSync).toHaveBeenCalledWith(toDoListFilePath);
    });
    
    it('should return index.html for unknown routes', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('text/html; charset=UTF-8');
    });

    it('should handle /rest routes', async () => {
        const res = await request(app).get('/rest/todo');
        // Assuming the endpoint and response
        expect(res.status).not.toBe(404);
    });

    it('should handle errors correctly', async () => {
        

        const res = await request(app).get('/cause-error');
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ status: 500, message: 'Simulated error' });                
    });
});

/*
describe('Express Server', () => {
    
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;

    afterAll(async () => {
        // Clean up: Delete the mock file after all tests
        // await fs.promises.unlink('/mocked/todo.json');

        // Close the server after all tests
        if (server) {
            server.close();
            console.log('Test server closed');
        }
    });

    it('should create todo file if it does not exist', async () => {
        // Temporarily rename or delete the todo file if it exists
        const { promises: fs } = require('fs');
        
        const tempFilePath = `${TODO_FILE_PATH}.tmp`;

        try {
            // Rename the file to simulate non-existence
            await fs.rename(TODO_FILE_PATH, tempFilePath);
        } catch (err: any) {
            if (err.code !== 'ENOENT') throw err; // Ignore if the file doesn't exist
        }

        // Restart the server to trigger file creation 
        server = await (new Promise(async (res, rej) => {
            const serv = app(TODO_FILE_PATH).listen(APP_PORT, () => {                
                res(serv);
            });
        }));

        // Check if the file has been created
        let fileExists = false;
        try {
            await fs.access(TODO_FILE_PATH);
            fileExists = true;
        } catch (err) {
            fileExists = false;
        }

        expect(fileExists).toBe(true);

        // Clean up by restoring the original file
        try {
            await fs.rename(tempFilePath, TODO_FILE_PATH);
        } catch (err: any) {
            if (err.code !== 'ENOENT') throw err;
        }
    });
        
});
*/