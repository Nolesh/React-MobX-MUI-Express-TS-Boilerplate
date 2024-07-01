import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import restRouter from '../../src/routes/rest';
import { getItems, postItem, patchItem, deleteItem } from '../../src/controllers/todo';
import { TODO_ROUTE } from '../../../shared/routes';

// Mock controllers
jest.mock('../../src/controllers/todo', () => ({
  getItems: jest.fn(),
  postItem: jest.fn(),
  patchItem: jest.fn(),
  deleteItem: jest.fn(),
}));

const fn = (result: any, status = 200) => (req: Request, res: Response) => res.status(status).json(result);


const app = express();
app.use(express.json());
app.use('/api', restRouter); // Mount your router under '/api'

describe('Todo Routes', () => {

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock call history after each test
  });

  it(`GET /api/${TODO_ROUTE} should return 200 and an array of items`, async () => {
    
    const mockItems = [{ id: 1, text: 'Mocked Item 1' }, { id: 2, text: 'Mocked Item 2' }];    
    (getItems as jest.Mock).mockImplementation(fn(mockItems));

    const res = await request(app).get(`/api/${TODO_ROUTE}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockItems);
  });

  it(`POST /api/${TODO_ROUTE} should create a new item`, async () => {
    const newItem = { text: 'Test todo item' };
    const mockCreatedItem = { id: 3, text: 'Test todo item' };
    (postItem as jest.Mock).mockImplementation(fn(mockCreatedItem, 201));

    const res = await request(app).post(`/api/${TODO_ROUTE}`).send(newItem);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockCreatedItem);
  });

  it(`PATCH /api/${TODO_ROUTE}/:id should update an existing item`, async () => {    
    const itemId = 1;
    const updatedItem = { text: 'Updated todo item' };
    const mockUpdatedItem = { id: itemId, text: 'Updated todo item' };
    (patchItem as jest.Mock).mockImplementation(fn(mockUpdatedItem));

    const res = await request(app).patch(`/api/${TODO_ROUTE}/${itemId}`).send(updatedItem);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUpdatedItem);
  });

  it(`DELETE /api/${TODO_ROUTE}/:id should delete an existing item`, async () => {    
    const itemId = 1;
    const mockDeletedItem = { id: itemId, text: 'Mocked item 1' };    
    (deleteItem as jest.Mock).mockImplementation(fn({ message: `Item ${itemId} deleted`, deletedItem: mockDeletedItem }));

    const res = await request(app).delete(`/api/${TODO_ROUTE}/${itemId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Item ${itemId} deleted`);
    expect(res.body.deletedItem).toEqual(mockDeletedItem);
  });

});