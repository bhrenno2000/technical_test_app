import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'aquivoceavalia.com',
  appName: 'AquiVoceAvalia',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
    }
  },
};

export default config;
