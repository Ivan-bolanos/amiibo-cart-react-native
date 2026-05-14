// Polyfill for AbortController
if (typeof global.AbortController === 'undefined') {
    global.AbortController = class AbortController {
        constructor() {
            this.signal = {
                aborted: false,
            };
        }
        abort() {
            this.signal.aborted = true;
        }
    };
}

// Mock React Native modules
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-gesture-handler', () => {
    const View = require('react-native/Libraries/Components/View/View');
    return {
        Swipeable: View,
        DrawerLayout: View,
        State: {},
        ScrollView: View,
        Slider: View,
        Switch: View,
        TextInput: View,
        ToolbarAndroid: View,
        ViewPagerAndroid: View,
        DrawerLayoutAndroid: View,
        WebView: View,
        NativeViewGestureHandler: View,
        TapGestureHandler: View,
        FlingGestureHandler: View,
        ForceTouchGestureHandler: View,
        LongPressGestureHandler: View,
        PanGestureHandler: View,
        PinchGestureHandler: View,
        RotationGestureHandler: View,
        RawButton: View,
        BaseButton: View,
        RectButton: View,
        BorderlessButton: View,
        FlatList: View,
        gestureHandlerRootHOC: jest.fn(component => component),
        Directions: {},
    };
});

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
        }),
    };
});

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => {};
    return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Test utilities
export const createMockStore = (initialState) => {
    const state = initialState || {
        userReducer: {
            games: [],
            shoppingCart: [],
            loading: false,
            error: null,
        },
    };

    return {
        getState: () => state,
        dispatch: jest.fn(),
        subscribe: jest.fn(),
    };
};

export const mockItem = {
    key: 0,
    name: 'Link',
    image: 'https://example.com/link.png',
    price: 1500,
    quantity: 0,
    character: 'Link',
    amiiboSeries: 'The Legend of Zelda',
    gameSeries: 'The Legend of Zelda',
};

export const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    dispatch: jest.fn(),
};