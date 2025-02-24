import {Dispatch} from "redux";
import {authAPI, ChangeUserNameParamsType, ForgotType, loginParamsType, SetNewPasswordType, UpdateUserNameType} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";
import axios, { AxiosError } from "axios";
import { AppThunk } from "../../app/store";


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

//Action Creators

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

//Thunk Creators


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
        const res = await authAPI.logOut()
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

export const forgotPasswordTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.forgotPassword(data)
        dispatch(setForgottenEmailAC(data.email))
        dispatch(setIsPasswordReset(true))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const setNewPasswordTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.setNewPassword(data)
        dispatch(setIsPasswordReset(false))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export const registerTC = (data) => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.register(data)
        window.location.href = '/login'
    }catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.data.error) {
                handleServerNetworkError(error.response?.data.error, dispatch)
            } else {
                handleServerNetworkError(error.message, dispatch)
            }
        }
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
    }

}



