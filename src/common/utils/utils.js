import {Dispatch} from 'redux'
import {
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType,
} from "../../app/app-reducer";

export const handleServerAppError = (data, dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error, dispatch) => {
    dispatch(setAppErrorAC(error ? error : "Some error occurred"))
}