import {setLogInAC, setUserInfoAC} from "../features/Login/auth-reducer";  
import {authAPI} from "./api";

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
        debugger
        const res = await authAPI.authMe();
        dispatch(setLogInAC(true));
        dispatch(setUserInfoAC(res.data));
    } catch (error) {
        const errorMessage = error?.data?.message || "Not Authorized";
        console.warn("Auth Error:", errorMessage);
        console.log("Auth Error:", errorMessage);
        dispatch(setLogInAC(false)); 
    } finally {
        dispatch(setAppInitializedAC(true));
    }
};

export const setAppErrorAC = (error) => ({type: 'APP/SET-ERROR', error} )
export const setAppModalTypeAC = (modaltype) => ({type: 'APP/SET-TYPE', modaltype} )
export const setAppStatusAC = (status) => ({type: 'APP/SET-STATUS', status} )
export const setAppInitializedAC = (value) => ({type: 'APP/SET-INITIALIZED', value} )

