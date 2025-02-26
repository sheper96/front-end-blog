import {authAPI} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import { setAppStatusAC} from "../../app/app-reducer";
import axios from "axios";

export function isAxiosError(error) {
    return axios.isAxiosError(error);
}

const initialState = {
    email: '',
    password: '',
    rememberMe: false,
    isLoggedIn: false,
    isPasswordReset: false,
    forgottenEmail: null ,
    userInfo: null
}
export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case "AUTH/SET-USER-INFO":
            return {...state, userInfo: action.userInfo}
        case "AUTH/SET-FORGOTTEN-EMAIL":
            return {...state, forgottenEmail: action.forgottenEmail}
        case "AUTH/SET-RESET-PASSWORD":
            return {...state, isPasswordReset: action.isPasswordReset}
        case 'AUTH/SET-LOGGED_IN_OUT':
            return {...state, isLoggedIn: action.isLoggedIn}
        default :
            return state
    }
}

export const setUserInfoAC = (userProfile) => {
    return {type: "AUTH/SET-USER-INFO", userInfo: userProfile} 
}
export const setForgottenEmailAC = (forgottenEmail) => {
    return {type: "AUTH/SET-FORGOTTEN-EMAIL", forgottenEmail: forgottenEmail} 
}
export const setIsPasswordReset = (isPasswordReset) => {
    return {type: "AUTH/SET-RESET-PASSWORD", isPasswordReset: isPasswordReset} 
}
export const setLogInAC = (isLoggedIn) => ({type: 'AUTH/SET-LOGGED_IN_OUT', isLoggedIn} )


export const updateUserInfoAvatarTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.changeAvatar(data)
        dispatch(setUserInfoAC(res.data.updatedUser))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export const loginTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res) {
            dispatch(setUserInfoAC(res.data))
            dispatch(setLogInAC(true))
        }
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.data.error) {
                handleServerNetworkError(error.response?.data.error, dispatch)
            } else {
                handleServerNetworkError(error.message, dispatch)
            }
        }
    }finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const logOutTC = () => async (dispatch) => {
    try {
        await authAPI.logOut()
        dispatch(setLogInAC(false))
    } catch (error) {
    }
}

export const updateUserInfoTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.updateName(data)
        dispatch(setUserInfoAC(res.data.updatedUser))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const registerTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.register(data)
        window.location.href = '/login'
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
    }

}



