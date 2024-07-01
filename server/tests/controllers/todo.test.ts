import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { getItems, postItem, patchItem, deleteItem } from '../../src/controllers/todo';
import { TODO_FILE_PATH } from '../../src/config';

jest.mock('fs');

describe('Todo Controllers', () => {
  const mockData = JSON.stringify([{ id: 1, text: 'Test item' }]);
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: { id: 2, text: 'New item' },
      params: { id: '0' }
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getItems', () => {
    it('should read items from file and return them', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

      getItems(req as Request, res as Response, next);

      expect(fs.readFileSync).toHaveBeenCalledWith(TODO_FILE_PATH, 'utf8');
      expect(res.json).toHaveBeenCalledWith({ content: JSON.parse(mockData) });
    });
  });

  describe('postItem', () => {
    it('should read, append, and write items to file', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
      const updatedData = JSON.stringify([
        { id: 1, text: 'Test item' },
        { id: 2, text: 'New item' }
      ]);

      postItem(req as Request, res as Response, next);

      expect(fs.readFileSync).toHaveBeenCalledWith(TODO_FILE_PATH, 'utf8');
      expect(fs.writeFileSync).toHaveBeenCalledWith(TODO_FILE_PATH, updatedData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ content: JSON.parse(updatedData) });
    });
  });

  describe('patchItem', () => {
    it('should update an item and write to file', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
      const updatedData = JSON.stringify([{ id: 2, text: 'New item' }]);

      patchItem(req as Request, res as Response, next);

      expect(fs.readFileSync).toHaveBeenCalledWith(TODO_FILE_PATH, 'utf8');
      expect(fs.writeFileSync).toHaveBeenCalledWith(TODO_FILE_PATH, updatedData);
      expect(res.json).toHaveBeenCalledWith({ content: JSON.parse(updatedData) });
    });
  });

  describe('deleteItem', () => {
    it('should delete an item and write to file', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
      const updatedData = JSON.stringify([]);

      deleteItem(req as Request, res as Response);

      expect(fs.readFileSync).toHaveBeenCalledWith(TODO_FILE_PATH, 'utf8');
      expect(fs.writeFileSync).toHaveBeenCalledWith(TODO_FILE_PATH, updatedData);
      expect(res.json).toHaveBeenCalledWith({ content: JSON.parse(updatedData) });
    });
  });
});
