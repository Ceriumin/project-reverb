require('@testing-library/jest-dom');

jest.mock('react-native', () => {
  return {
    useColorScheme: jest.fn().mockReturnValue('light'),
    StyleSheet: {
      create: jest.fn(styles => styles),
    },
    Platform: {
      OS: 'web',
      select: jest.fn(obj => obj.web),
    },
    Dimensions: {
      get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
    },
    View: 'View',
    Text: 'Text',
    TouchableOpacity: 'TouchableOpacity',
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }) => children,
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: jest.fn().mockReturnValue({
      params: {},
    }),
    useTheme: jest.fn().mockReturnValue({
      colors: {
        primary: '#000000',
        background: '#FFFFFF',
        card: '#FFFFFF',
        text: '#000000',
        border: '#000000',
        notification: '#FF0000',
      },
    }),
  };
});

jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: 'Navigator',
      Screen: 'Screen',
    }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn().mockReturnValue({
      Navigator: 'Navigator',
      Screen: 'Screen',
    }),
  };
});

// Mock gesture handler
jest.mock('react-native-gesture-handler', () => {});

// Reset all mocks automatically between tests
beforeEach(() => {
  jest.clearAllMocks();
});