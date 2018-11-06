import { Navigation } from 'react-native-navigation';
import SplashScreen from './screens/default/SplashScreen';

export function routes() {
    Navigation.registerComponent('SplashScreen', () => SplashScreen);
}