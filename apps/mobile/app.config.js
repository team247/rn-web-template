const IS_DEV = process.env.APP_ENV === 'development';
const IS_PREVIEW = process.env.APP_ENV === 'preview';

const getAppName = () => {
  if (IS_DEV) return 'MyApp (Dev)';
  if (IS_PREVIEW) return 'MyApp (Preview)';
  return 'MyApp';
};

const getBundleId = () => {
  if (IS_DEV) return 'com.example.myapp.dev';
  if (IS_PREVIEW) return 'com.example.myapp.preview';
  return 'com.example.myapp';
};

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: getAppName(),
  slug: 'myapp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getBundleId(),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: getBundleId(),
  },
  extra: {
    eas: {
      projectId: 'your-project-id',
    },
  },
  updates: {
    url: 'https://u.expo.dev/your-project-id',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};
