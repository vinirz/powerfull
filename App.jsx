import Routes from './pages/Routes';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'react-native';
import { SessionProvider } from './contexts/SessionContext';

StatusBar.setBarStyle('light');
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent');

NavigationBar.setVisibilityAsync('hidden');
NavigationBar.setBehaviorAsync('overlay-swipe');

export default function App() {
  return (
    <SessionProvider>
      <Routes />
    </SessionProvider>
  );
}
