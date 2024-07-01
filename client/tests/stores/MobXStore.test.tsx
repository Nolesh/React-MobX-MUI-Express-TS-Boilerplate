import React, { FunctionComponent } from 'react';
import { act, fireEvent, render, renderHook, waitFor } from '@testing-library/react';
import { StoreProvider, useStore, MobXObserver } from '../../src/stores';


import ProgressBarStore from '../../src/stores/ProgressBarStore';
import SnackbarStore from 'stores/SnackbarStore';
import ThemeStore from 'stores/ThemeStore';

// Mock stores
// jest.mock('../../src/stores/ProgressBarStore', () => ({
//     loading: false,
//     setLoadingState: jest.fn(),
// }));


describe('StoreProvider and useStore', () => {
    let originalConsoleError: typeof console.error;

    beforeEach(() => {
        // Supress error
        originalConsoleError = console.error;
        console.error = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        console.error = originalConsoleError;
    });

    it('should throw an error if useStore is called outside of StoreProvider', () => {
        try {
            renderHook(() => useStore('progressBar'));
        }
        catch (e) {
            expect(e).toEqual(
                new Error('Stores cannot be null. Did you call the hook inside a context provider (StoreProvider)?')
            );
        }
    });

    it('should provide the stores via context', () => {
        const { result } = renderHook(() => useStore('progressBar'), {
            wrapper: ({ children }) => <StoreProvider>{children}</StoreProvider>,
        });

        expect(result.current).toHaveProperty('loading', false);
        expect(result.current).toHaveProperty('setLoadingState');
    });

    it('should throw an error if a non-existent store is requested', () => {
        try {
            renderHook(() => useStore('nonExistentStore' as any), {
                wrapper: ({ children }) => <StoreProvider>{children}</StoreProvider>,
            });
        }
        catch (e) {
            expect(e).toEqual(new Error('Store nonExistentStore not found'));
        }
    });

    it('should integrate with MobXObserver', async () => {
        const TestComponent: FunctionComponent = MobXObserver(() => {
            const progressBarStore = useStore('progressBar');
            
            return (
                <div>
                    <span>{progressBarStore.loading ? 'Loading' : 'Not Loading'}</span>
                    <button onClick={() => progressBarStore.setLoadingState(!progressBarStore.loading)}>
                        Toggle
                    </button>
                </div>
            );
        });

        const { getByText } = render(
            <StoreProvider>
                <TestComponent />
            </StoreProvider>
        );

        expect(getByText('Not Loading')).toBeInTheDocument();

        fireEvent.click(getByText('Toggle'));

        expect(getByText('Loading')).toBeInTheDocument();
    });
});
