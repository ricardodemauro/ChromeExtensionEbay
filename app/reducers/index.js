import { combineReducers } from 'redux'

import * as types from '../actionTypes'

const slugReducer = (state = {}, action) => {
    const { type, slug } = action
    const { slugColl, assetColl } = state
    switch(type) {
        case types.RETRIVED_SLUG:
        case types.SEARCH_SLUG: 
            const nSlugColl = slugColl ? slugColl : []
            return {
                ...state,
                slugColl: nSlugColl.concat(slug)
            }
    }
}

const rootReducer = combineReducers({
    slugReducer
})