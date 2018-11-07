import { Navigation } from 'react-native-navigation';
import HomeScreen from './screens/home/HomeScreen';

export function routes() {
    Navigation.registerComponent('HomeScreen', () => HomeScreen);
}