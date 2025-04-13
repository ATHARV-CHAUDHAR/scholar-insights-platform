
/**
 * Application configuration
 */
const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'https://api.avaedtech.com/v1',
    timeout: 30000, // 30 seconds
  },
  
  // Authentication
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
  },
  
  // Application settings
  app: {
    name: 'AVA Ed. Tech',
    version: '1.0.0',
    logoPath: '/ava-ed-tech-logo.png',
    contactEmail: 'support@avaedtech.com',
  },
  
  // Feature flags
  features: {
    enableNotifications: true,
    enableReports: true,
    enableCalendar: true,
  }
};

export default config;
