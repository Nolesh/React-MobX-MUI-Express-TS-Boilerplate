import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import NavTabs from '../../src/components/Tabs';


// Mocking react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

const modules = [
  { name: 'Home', url: 'home' },
  { name: 'About', url: 'about' },
  { name: 'Contact', url: 'contact' },
];

describe('NavTabs', () => {
  let navigateMock: jest.Mock;
  // let locationMock: jest.Mock;

  beforeEach(() => {
    navigateMock = jest.fn();
    // locationMock = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with provided modules', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });

    render(
      <MemoryRouter>
        <NavTabs modules={modules} />
      </MemoryRouter>
    );

    modules.forEach((module) => {
      expect(screen.getByText(module.name)).toBeInTheDocument();
    });
  });

  it('should navigate to the correct tab on click', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });

    render(
      <MemoryRouter>
        <NavTabs modules={modules} />
      </MemoryRouter>
    );

    const aboutTab = screen.getByText('About');
    fireEvent.click(aboutTab);

    expect(navigateMock).toHaveBeenCalledWith('about');
  });

  it('should set the correct tab based on the current URL', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/about' });

    render(
      <MemoryRouter initialEntries={['/about']}>
        <NavTabs modules={modules} />
      </MemoryRouter>
    );

    const aboutTab = screen.getByRole('tab', { selected: true });
    expect(aboutTab).toHaveTextContent('About');
  });
});
