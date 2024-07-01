import fs, { promises as fsp } from 'fs';
import path from 'path';
import { createToDoListFile, createToDoListFileSync } from '../../src/utils'; // Adjust the path as necessary

describe('createToDoListFile', () => {
    const testFilePath = path.join(__dirname, 'test-todo-list.json');
    let originalConsoleLog: typeof console.log;

    beforeAll(() => {
        // Supress logs
        originalConsoleLog = console.log;
        console.log = jest.fn();
    });

    afterAll(() => {
        // Restore the original console.log function after all tests
        console.log = originalConsoleLog;
    });

    afterEach(async () => {
        try {
            await fsp.unlink(testFilePath); // Clean up the test file after each test
        } catch (err) {
            // Ignore errors if the file doesn't exist
        }
    });

    it('should create a new file if it does not exist', async () => {
        await createToDoListFile(testFilePath);

        // Verify that the file exists
        const fileExists = await fsp.access(testFilePath).then(() => true).catch(() => false);
        expect(fileExists).toBe(true);
    });

    it('should not overwrite the file if it already exists', async () => {
        // Create the file first
        await fsp.writeFile(testFilePath, '[]');

        // Call createToDoListFile again
        await createToDoListFile(testFilePath);

        // Verify that the file contents remain unchanged
        const fileContents = await fsp.readFile(testFilePath, 'utf-8');
        expect(fileContents).toBe('[]');
    });
});

describe('createToDoListFileSync', () => {
    const testFilePath = path.join(__dirname, 'test-todo-list-sync.json');
    let originalConsoleLog: typeof console.log;

    beforeAll(() => {
        // Supress logs
        originalConsoleLog = console.log;
        console.log = jest.fn();
    });

    afterAll(() => {
        // Restore the original console.log function after all tests
        console.log = originalConsoleLog;
    });

    afterEach(() => {
        try {
            fs.unlinkSync(testFilePath); // Clean up the test file after each test
        } catch (err) {
            // Ignore errors if the file doesn't exist
        }
    });

    it('should create a new file if it does not exist', () => {
        createToDoListFileSync(testFilePath);

        // Verify that the file exists
        const fileExists = fs.existsSync(testFilePath);
        expect(fileExists).toBe(true);
    });

    it('should not overwrite the file if it already exists', () => {
        // Create the file first
        fs.writeFileSync(testFilePath, '[]');

        // Call createToDoListFileSync again
        createToDoListFileSync(testFilePath);

        // Verify that the file contents remain unchanged
        const fileContents = fs.readFileSync(testFilePath, 'utf-8');
        expect(fileContents).toBe('[]');
    });
});