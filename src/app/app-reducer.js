import {Dispatch} from "redux"
import {setLogInAC, setUserInfoAC} from "../features/Login/auth-reducer";  
import {authAPI} from "./api";
// import { AppThunk } from "./store";


const initialState = {
    status: 'idle',
    error: null,
    modaltype: null,
    isInitialized: false,
   
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        case 'APP/SET-TYPE':
            return {...state, modaltype: action.modaltype}
      
        default:
            return {...state}
    }
}

export const initializeAppTC = () => async (dispatch) => {
    try {
        const res = await authAPI.authMe()
        const {iat, exp , ...userData} = res.data
        dispatch(setLogInAC(true))
        dispatch(setUserInfoAC(userData))
    } catch (e) {
    } finally {
        dispatch(setAppInitializedAC(true))
    }
}

// export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// export type InitialStateType = {
//     status: RequestStatusType
//     error: string | null,
//     modaltype: string | null,
//     isInitialized: boolean
// }

export const setAppErrorAC = (error) => ({type: 'APP/SET-ERROR', error} )
export const setAppModalTypeAC = (modaltype) => ({type: 'APP/SET-TYPE', modaltype} )
export const setAppStatusAC = (status) => ({type: 'APP/SET-STATUS', status} )
export const setAppInitializedAC = (value) => ({type: 'APP/SET-INITIALIZED', value} )

