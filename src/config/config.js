import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const config = {
  port: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  mysql: {
    port: process.env.MYSQL_PORT || 3306,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  post: {
    port: process.env.POSTS_SERVICE_PORT || 3001,
    host: process.env.POSTS_SERVICE_HOST || 'localhost'
  },
  cache: {
    port: process.env.CACHE_SERVICE_PORT || 3002,
    host: process.env.CACHE_SERVICE_HOST || 'localhost'
  }
}
