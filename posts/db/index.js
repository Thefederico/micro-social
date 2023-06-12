import { config } from '@/config/config'
import Remote from './remote'

const {
  mysql: { host, port }
} = config

export default new Remote(host, port)
