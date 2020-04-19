import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.GDT_BACKEND_PORT,
  MONGO_URL: process.env.MONGO_URL,
  REDIS_ADDR: process.env.REDIS_ADDR,
  KUE_PREFIX_MESSAGES: process.env.KUE_PREFIX_MESSAGES,
  MAX_QUEUE_PROCESS: process.env.MAX_QUEUE_PROCESS,
}