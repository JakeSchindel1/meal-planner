import 'dotenv/config';

module.exports = {
  name: "MealPlanner",
  slug: "MealPlanner",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  // Add environment variables
  extra: {
    SUPABASE_URL: process.env.SUPABASE_URL || "your-supabase-url",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key",
  },
}; 