import * as types from '../actionTypes'

export const getBaseUri = () => {
    return window.location.protocol + '\\\\' + window.location.host + '\\'
}

export const beginFetch = () => {
    return {
        type: types.API_REQUEST_BEGIN
    }
}

export const endFetch = () => {
    return {
        type: types.API_REQUEST_END
    }
}

export const errorFetch = (error) => {
    return {
        type: types.API_REQUEST_ERROR,
        error
    }
}

export const logFetch = (json) => {
    return {
        type: types.API_REQUEST_LOG,
        json
    }
}

export const retrivedSlug = (data) => {
    return {
        type: types.RETRIVED_SLUG,
        data
    }
}

export const fetchSlug = data => dispatch => {
    const uri = `https://autosug.ebay.com/autosug?kwd=${data}&_jgr=1&sId=0&_ch=0&callback=nil`
    dispatch(beginFetch())
    return fetch(uri)
        .then(response => response.json())
        .then(json => {
            dispatch(logFetch(JSON.stringify(json, null, 2)))
            dispatch(retrivedSlug(json))
            dispatch(endFetch())
        })
        .catch(err => {
            dispatch(errorFetch(err))
        })
}

