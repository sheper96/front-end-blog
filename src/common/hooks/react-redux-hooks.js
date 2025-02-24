import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../app/store";

export const useAppDispatch = useDispatch
export const useAppSelector = useSelector