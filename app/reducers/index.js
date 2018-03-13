import { combineReducers } from 'redux'

import { slugReducer } from './slugReducer'
import { systemReducer } from './systemReducer'

const rootReducer = combineReducers({
    slugReducer,
    systemReducer
})

export default rootReducer