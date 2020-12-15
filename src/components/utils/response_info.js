import { refreshToken } from '../actions/auth'

export function isOk(response) {
    if (response === null || response === undefined) {
        return false
    }
    if (response.status === 401) {
        refreshToken()()
    }
    if (response.status >= 200 && response.status < 300) {
        return true
    }
    return false
}