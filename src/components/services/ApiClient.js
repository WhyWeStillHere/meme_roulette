const baseUrl = 'http://localhost:8000/api/'

export function ApiClient (url, init) {
    const token = window.localStorage.getItem('auth')
    let headers;

    ({ headers } = init || {headers: {}})

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    return fetch(`${baseUrl}${url}`, { ...init, headers})
}