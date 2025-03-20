import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/navigation/_index';
import { AuthContext } from '../src/context/_index';

// Mock theme
jest.mock('../src/constants/theme', () => ({
  lightTheme: {},
  darkTheme: {},
}));

// Mock Amplify auth
jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  signUp: jest.fn(),
  confirmSignUp: jest.fn(),
  getCurrentUser: jest.fn(),
}));

jest.mock('aws-amplify/utils', () => ({
  Hub: {
    listen: jest.fn(),
  },
}));

jest.mock('../src/navigation/AppNavigator', () => {
  return function MockAppNavigator() {
    return <div data-testid="app-navigator">App Navigator</div>;
  };
});

const mockAuthContextValue = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  signIn: jest.fn().mockResolvedValue({}),
  signUp: jest.fn().mockResolvedValue({ isSignUpComplete: true }),
  signOut: jest.fn().mockResolvedValue({}),
  confirmSignUp: jest.fn().mockResolvedValue({}),
  clearError: jest.fn()
};

const renderWithAuth = (ui: React.ReactNode) => {
  return render(
    <AuthContext.Provider value={mockAuthContextValue}>
      {ui}
    </AuthContext.Provider>
  );
};

describe('App', () => {
  test('renders without crashing', () => {
    const { getByTestId } = renderWithAuth(<App />);
    expect(getByTestId('app-navigator')).toBeInTheDocument();
  });
  
  test('renders correctly when authenticated', () => {
    const authenticatedValue = {
      ...mockAuthContextValue,
      isAuthenticated: true,
      user: { username: 'testuser', userId: 'test-user-id' }
    };
    
    const { getByTestId } = render(
      <AuthContext.Provider value={authenticatedValue}>
        <App />
      </AuthContext.Provider>
    );
    
    expect(getByTestId('app-navigator')).toBeInTheDocument();
  });
});