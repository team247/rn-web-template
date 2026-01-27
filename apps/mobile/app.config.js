const IS_DEV = process.env.APP_ENV === 'development';
const IS_PREVIEW = process.env.APP_ENV === 'preview';

const getAppName = () => {
  const baseName = process.env.APP_NAME || 'MyApp';
  if (IS_DEV) return `${baseName} (Dev)`;
  if (IS_PREVIEW) return `${baseName} (Preview)`;
  return baseName;
};

const getBundleId = () => {
  const baseId = process.env.IOS_BUNDLE_ID || 'com.example.myapp';
  if (IS_DEV) return `${baseId}.dev`;
  if (IS_PREVIEW) return `${baseId}.preview`;
  return baseId;
};

const getAndroidPackage = () => {
  const basePackage = process.env.ANDROID_PACKAGE || 'com.example.myapp';
  if (IS_DEV) return `${basePackage}.dev`;
  if (IS_PREVIEW) return `${basePackage}.preview`;
  return basePackage;
};

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: getAppName(),
  slug: process.env.EXPO_PROJECT_SLUG || 'myapp',
  owner: process.env.EXPO_OWNER || undefined,
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: process.env.APP_SCHEME || 'myapp',
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
    package: getAndroidPackage(),
  },
  extra: {
    eas: {
      projectId: process.env.EXPO_PROJECT_ID || undefined,
    },
  },
  updates: {
    url: process.env.EXPO_UPDATES_URL || undefined,
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  plugins: ['expo-secure-store'],
};
