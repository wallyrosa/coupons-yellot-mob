// Mock do React Native Reanimated
jest.mock("react-native-reanimated", () => ({
  default: {
    call: jest.fn(),
    runOnJS: jest.fn(),
    runOnUI: jest.fn(),
  },
  useSharedValue: jest.fn((value) => ({ value })),
  useAnimatedStyle: jest.fn((fn) => fn()),
  withTiming: jest.fn((value) => value),
  withSpring: jest.fn((value) => value),
  interpolate: jest.fn(),
  Extrapolate: {
    CLAMP: "clamp",
    EXTEND: "extend",
    IDENTITY: "identity",
  },
  View: "View",
  Text: "Text",
  ScrollView: "ScrollView",
  FlatList: "FlatList",
}));

// Mock do React Native Worklets
jest.mock("react-native-worklets", () => ({
  runOnUI: (fn: any) => fn,
  runOnJS: (fn: any) => fn,
}));

// Mock do Expo Router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  usePathname: () => "/",
}));

// Mock do NativeWind
jest.mock("nativewind", () => ({
  styled: (Component: any) => Component,
}));

// Mock do Axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

// Mock do Toast
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// Mock do Expo Font
jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

// Mock do Expo Constants
jest.mock("expo-constants", () => ({
  expoConfig: {
    extra: {
      apiUrl: "https://api.yellotmob.com.br",
    },
  },
}));
