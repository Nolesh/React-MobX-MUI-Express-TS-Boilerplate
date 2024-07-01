import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../src/modules/App';

// Mock the components used within App
jest.mock('../../src/modules/Welcome', () => () => <div>Welcome Component</div>);
jest.mock('../../src/modules/MobXExample', () => () => <div>MobX Example Component</div>);
jest.mock('../../src/modules/ToDoList', () => () => <div>To-Do List Component</div>);

jest.mock('../../src/components/ProgressBar', () => () => <div>Progress Bar</div>);
jest.mock('../../src/components/Snackbar', () => () => <div>Snackbar</div>);
jest.mock('../../src/components/FallbackRenderer', () => () => <div>Fallback Renderer</div>);
// jest.mock('../../src/components/Tabs', () => () => <div>Nav Tabs</div>);
jest.mock('../../src/components/Theme', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('../../src/components/Footer', () => () => <div>Footer</div>);

describe('App Component', () => {
    it('renders the App component with routes and navigation', async () => {
        render(<App />);

        // Check for static components
        expect(screen.getByText('Progress Bar')).toBeInTheDocument();
        expect(screen.getByText('Snackbar')).toBeInTheDocument();
        // expect(screen.getByText('Nav Tabs')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();

        // Check for lazy-loaded Welcome component
        await waitFor(() => {
            expect(screen.getByText('Welcome Component')).toBeInTheDocument();
        });

        // Check for navigation links (NavTabs)
        // Uncomment if you are using the custom Nav component
        expect(screen.getByText('Welcome')).toBeInTheDocument();
        expect(screen.getByText('MobX')).toBeInTheDocument();
        expect(screen.getByText('To-do List')).toBeInTheDocument();

        // Simulate navigation and check for route components    
        fireEvent.click(screen.getByText('MobX'));
        await waitFor(() => {
            expect(screen.getByText('MobX Example Component')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('To-do List'));
        await waitFor(() => {
            expect(screen.getByText('To-Do List Component')).toBeInTheDocument();
        });
    });
});
