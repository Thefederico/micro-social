import { config } from '@/config/config'
import RemoteDB from './remote'
import RemoteCache from './remote.cache'

const {
  mysql: { host, port },
  cache: { port: cachePort, host: cacheHost }
} = config

const remoteDB = new RemoteDB(host, port)
const remoteCache = new RemoteCache(cacheHost, cachePort)

export { remoteDB, remoteCache }
