import { createPinia } from 'pinia'
import presist from 'pinia-plugin-persistedstate'

const pinia = createPinia().use(presist)

export { pinia }

export * from './modules/user'
export * from './modules/counter'
