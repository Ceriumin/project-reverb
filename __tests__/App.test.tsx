import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/navigation/_index';

jest.mock('../src/constants/theme', () => ({
  lightTheme: {},
  darkTheme: {},
}));

jest.mock('../src/navigation/AppNavigator', () => {
  return function MockAppNavigator() {
    return <div data-testid="app-navigator">App Navigator</div>;
  };
});

describe('App', () => {
  test('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app-navigator')).toBeInTheDocument();
  });
});