import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { request } from '../../src/utils/Rest';
import ToDoList from '../../src/modules/ToDoList';
import { TItemData } from '../../../shared/types';

// Mocking the request module
jest.mock('../../src/utils/Rest', () => ({
    request: jest.fn(),
  }));
  
  const mockRequest = request as jest.MockedFunction<typeof request>;
  
  const mockItems: TItemData[] = [
      { title: 'Item 1', desc: 'Description 1' },
      { title: 'Item 2', desc: 'Description 2' },
      { title: 'Item 3', desc: 'Description 3' },
  ];
  
  describe('ToDoList', () => {
    beforeEach(() => {
        mockRequest.mockResolvedValue({ content: mockItems });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly with initial items', async () => {
        await act(async () => {
            render(<ToDoList />);
        });

        await waitFor(() => expect(screen.getByText('Item 1')).toBeInTheDocument());
        mockItems.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(item.desc)).toBeInTheDocument();
        });
        
    });

    it('should open add dialog and add new item', async () => {
        await act(async () => {
            render(<ToDoList />);
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Add'));
        });

        // Ensure the dialog is open
        await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
        
        const titleInput = screen.getByLabelText(/Title/i);
        const descInput = screen.getByLabelText(/Description/i);
        
        await act(async () => {
            fireEvent.change(titleInput, { target: { value: 'New Item' } });
            fireEvent.change(descInput, { target: { value: 'New Description' } });
        });

        mockRequest.mockResolvedValueOnce({ content: [...mockItems, { title: 'New Item', desc: 'New Description' }] });

        await act(async () => {
            fireEvent.click(screen.getByText('Confirm'));
        });

        await waitFor(() => expect(screen.getByText('New Item')).toBeInTheDocument());
        expect(screen.getByText('New Description')).toBeInTheDocument();
        
    });

    it('should open edit dialog and edit existing item', async () => {
        await act(async () => {
            render(<ToDoList />);
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Item 1'));            
        });

        await act(async () => {            
            fireEvent.click(screen.getByText('Edit'));
        });

        // Ensure the dialog is open
        await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

        const titleInput = screen.getByLabelText(/Title/i);
        const descInput = screen.getByLabelText(/Description/i);

        await act(async () => {
            fireEvent.change(titleInput, { target: { value: 'Edited Item 1' } });
            fireEvent.change(descInput, { target: { value: 'Edited Description 1' } });
        });

        mockRequest.mockResolvedValueOnce({
            content: [{ title: 'Edited Item 1', desc: 'Edited Description 1' }, ...mockItems.slice(1)],
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Confirm'));
        });

        await waitFor(() => expect(screen.getByText('Edited Item 1')).toBeInTheDocument());
        expect(screen.getByText('Edited Description 1')).toBeInTheDocument();
    });

    it('should open delete dialog and delete an item', async () => {
        await act(async () => {
            render(<ToDoList />);
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Item 1'));            
        });

        await act(async () => {            
            fireEvent.click(screen.getByText('Delete'));
        });

        // Ensure the dialog is open
        await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

        mockRequest.mockResolvedValueOnce({ content: mockItems.slice(1) });

        await act(async () => {
            fireEvent.click(screen.getByText('Confirm'));
        });

        await waitFor(() => expect(screen.queryByText('Item 1')).not.toBeInTheDocument());
    });
});