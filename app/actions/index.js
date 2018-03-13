import { API_REQUEST_BEGIN,
    API_REQUEST_END,
    API_REQUEST_ERROR,
    API_REQUEST_LOG,
    RETRIVED_SLUG,
    FETCHED_DETAIL,
    FETCH_DETAIL,
    CLEAR_DATA } from '../actionTypes'

export const getBaseUri = () => {
    return window.location.protocol + '\\\\' + window.location.host + '\\'
}

export const beginFetch = () => {
    return {
        type: API_REQUEST_BEGIN
    }
}

export const endFetch = () => {
    return {
        type: API_REQUEST_END
    }
}

export const errorFetch = (error) => {
    return {
        type: API_REQUEST_ERROR,
        error
    }
}

export const logFetch = (json) => {
    return {
        type: API_REQUEST_LOG,
        json
    }
}

export const retrivedSlug = (data) => {
    return {
        type: RETRIVED_SLUG,
        data
    }
}

export const retrivedDetailedAsset = (data) => {
    return {
        type: FETCHED_DETAIL,
        data
    }
}

export const fetchingStatusAsset = (data) => {
    return {
        type: FETCH_DETAIL,
        data
    }
}

export const clearData = () => {
    return {
        type: CLEAR_DATA
    }
}

export const fetchDetailAsset = name => dispatch => {
    dispatch(fetchingStatusAsset(name))

    const uri = `http://localhost:3000/asset/${name}`
    const opts = {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
        mode: 'cors',
        cache: 'default'
    } 
    dispatch(beginFetch())
    return fetch(uri, opts)
        .then(response => response.json())
        .then(json => {
            dispatch(logFetch(JSON.stringify(json, null, 2)))
            dispatch(retrivedDetailedAsset(json))
            dispatch(endFetch())
        })
        .catch(err => {
            dispatch(errorFetch(err))
        })
}

export const fetchSlug = data => dispatch => {
    //const uri = `https://autosug.ebay.com/autosug?kwd=${data}&_jgr=1&sId=0&_ch=0&callback=nil`
    const uri = `http://localhost:3000/slug/${data}`
    
    const opts = {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
        mode: 'cors',
        cache: 'default'
    }
    dispatch(beginFetch())
    return fetch(uri, opts)
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
