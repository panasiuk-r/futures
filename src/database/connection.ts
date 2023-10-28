import { Sequelize } from 'sequelize';
import Redis from 'ioredis'
import dotenv from 'dotenv';

dotenv.config({ path: './src/config.env' });

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
})


const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USERNAME || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const checkCon = async () => {
  try {
    await Promise.all([
      sequelize.authenticate(),
      redis.ping()
    ])
    console.log('Connection to both Redis and database has been established successfully.')
  } catch (error) {
    console.error('Error connecting:', error)
  }
}

export { sequelize, redis, checkCon }