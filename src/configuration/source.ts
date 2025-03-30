export default () => {
  return {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    database: {
      mongo: {
        uri: process.env.MONGO_URI,
        retryAttempts: parseInt(process.env.MONGO_RETRY_ATTEMPTS) || 5,
        retryDelay: parseInt(process.env.MONGO_RETRY_DELAY) || 1000,
      },
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    },
  };
};
