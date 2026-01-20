import './global.css';

// Initialize secure storage before app loads
import { initializeSecureStorage } from './src/lib/secureStorage';
initializeSecureStorage();

import { registerRootComponent } from 'expo';
import App from './src/app/App';

registerRootComponent(App);
