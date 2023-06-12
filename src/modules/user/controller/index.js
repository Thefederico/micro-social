import controller from './controller'
import { remoteDB, remoteCache } from '@/db/index'

export default controller(remoteDB, remoteCache)
