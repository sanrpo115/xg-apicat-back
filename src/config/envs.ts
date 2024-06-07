export const envs = {
  API_URL: process.env.API_URL || 'https://api.thecatapi.com/v1',
  JWT_SEED: process.env.JWT_SEED || 'XpertGroup',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://mongo-user:123456@localhost:27017',
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'user-xgroup'
}