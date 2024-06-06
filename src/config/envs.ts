export const envs = {
  API_URL: process.env.API_URL || 'https://api.thecatapi.com/v1',
  API_KEY: process.env.API_KEY || 'live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP',
  JWT_SEED: process.env.JWT_SEED || 'X-seed',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://mongo-user:123456@localhost:27017',
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'user-xgroup'
}