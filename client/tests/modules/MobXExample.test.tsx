import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { useStore, MobXObserver } from '../../src/stores';
import MobXExample from '../../src/modules/MobXExample';
import ProgressBarStore from 'stores/ProgressBarStore';
import SnackbarStore from 'stores/SnackbarStore';
import ThemeStore from 'stores/ThemeStore';

// Mock the MobX stores
jest.mock('../../src/stores', () => ({
  useStore: jest.fn(),
  MobXObserver: (component: React.FC) => component,
}));

describe('MobXExample Component', () => {
  let mockProgressBarStore: typeof ProgressBarStore;
  let mockSnackbarStore: typeof SnackbarStore;
  let mockThemeStore: typeof ThemeStore;

  beforeEach(() => {
    mockProgressBarStore = {
      loading: false,
      setLoadingState: jest.fn(),
    };
    mockSnackbarStore = {
      message: "",
      severity: "success",
      isOpen: false,
      showMessage: jest.fn(),
      closeMessage: jest.fn(),
    };
    mockThemeStore = {
      dark: false,
      setDark: jest.fn(),
    };

    (useStore as jest.Mock).mockImplementation((storeName: string) => {
      if (storeName === 'progressBar') return mockProgressBarStore;
      if (storeName === 'snackbar') return mockSnackbarStore;
      if (storeName === 'theme') return mockThemeStore;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render buttons with correct initial text', () => {
    render(<MobXExample />);

    expect(screen.getByText('Show progress bar')).toBeInTheDocument();
    expect(screen.getByText('Show snackbar')).toBeInTheDocument();
    expect(screen.getByText('Switch to dark theme')).toBeInTheDocument();
  });

  it('should toggle progress bar state on button click', () => {
    const { rerender } = render(<MobXExample />);

    const progressBarButton = screen.getByText('Show progress bar');
    fireEvent.click(progressBarButton);

    expect(mockProgressBarStore.setLoadingState).toHaveBeenCalledWith(true);
    mockProgressBarStore.loading = true;

    rerender(<MobXExample />);

    fireEvent.click(screen.getByText('Hide progress bar'));
    expect(mockProgressBarStore.setLoadingState).toHaveBeenCalledWith(false);
  });

  it('should toggle snackbar state on button click', async () => {
    const { rerender } = render(<MobXExample />);

    const snackbarButton = screen.getByText('Show snackbar');

    fireEvent.click(snackbarButton);
    mockSnackbarStore.isOpen = true;
    expect(mockSnackbarStore.showMessage).toHaveBeenCalled();

    rerender(<MobXExample />);

    fireEvent.click(screen.getByText('Hide snackbar'));
    expect(mockSnackbarStore.closeMessage).toHaveBeenCalled();    
  });
  
    it('should toggle theme state on button click', () => {
      const { rerender } = render(<MobXExample />);
  
      const themeButton = screen.getByText('Switch to dark theme');
      fireEvent.click(themeButton);
  
      expect(mockThemeStore.setDark).toHaveBeenCalledWith(true);  
      mockThemeStore.dark = true;

      rerender(<MobXExample />);

      fireEvent.click(screen.getByText('Switch to light theme'));  
      expect(mockThemeStore.setDark).toHaveBeenCalledWith(false);
    });
});
