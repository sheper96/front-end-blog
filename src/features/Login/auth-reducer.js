import { authAPI } from "../../app/api";
import { setAppStatusAC } from "../../app/app-reducer";
import axios from "axios";

export function isAxiosError(error) {
    return axios.isAxiosError(error);
}

const initialState = {
    isLoggedIn: false,
    userInfo: {}
}
export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case "AUTH/SET-USER-INFO":
            return { ...state, userInfo: action.userInfo }
        case "AUTH/SET-FORGOTTEN-EMAIL":
            return { ...state, forgottenEmail: action.forgottenEmail }
        case "AUTH/SET-RESET-PASSWORD":
            return { ...state, isPasswordReset: action.isPasswordReset }
        case 'AUTH/SET-LOGGED_IN_OUT':
            return { ...state, isLoggedIn: action.isLoggedIn }
        default:
            return state
    }
}

export const setUserInfoAC = (userProfile) => {
    return { type: "AUTH/SET-USER-INFO", userInfo: userProfile }
}
export const setForgottenEmailAC = (forgottenEmail) => {
    return { type: "AUTH/SET-FORGOTTEN-EMAIL", forgottenEmail: forgottenEmail }
}
export const setIsPasswordReset = (isPasswordReset) => {
    return { type: "AUTH/SET-RESET-PASSWORD", isPasswordReset: isPasswordReset }
}
export const setLogInAC = (isLoggedIn) => ({ type: 'AUTH/SET-LOGGED_IN_OUT', isLoggedIn })


export const loginTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res) {
            dispatch(setUserInfoAC(res.data))
            dispatch(setLogInAC(true))
        }
    } catch (error) {
        alert(error.response.data.message)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const logOutTC = () => async (dispatch) => {
    try {
        await authAPI.logOut()
        dispatch(setLogInAC(false))
    } catch (error) {
        alert(error.response.data.message)
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const updateUserInfoTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.updateName(data)
        dispatch(setUserInfoAC(res.data.updatedUser))
    } catch (error) {
        alert(error.response.data.message)
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const registerTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.register(data)
        window.location.href = '/login'
    }
    catch (error) {
        alert(error.response.data.message)
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
    }

}



