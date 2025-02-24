import {postAPI} from '../../app/api'
import { setAppStatusAC } from '../../app/app-reducer'
import {initializeAppTC} from '../../app/app-reducer'

const initialState = {
    posts : []
}

export const postsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "POST/SET-ALL-POSTS":
            return {...state, posts: action.posts}
      
        default :
            return state
    }
}

export const setAllPosts = (posts) => {
    return {type: "POST/SET-ALL-POSTS", posts: posts} 
}
export const setForgottenEmailAC = (forgottenEmail) => {
    return {type: "AUTH/SET-FORGOTTEN-EMAIL", forgottenEmail: forgottenEmail} 
}
export const setIsPasswordReset = (isPasswordReset) => {
    return {type: "AUTH/SET-RESET-PASSWORD", isPasswordReset: isPasswordReset} 
}
export const setLogInAC = (isLoggedIn) => ({type: 'AUTH/SET-LOGGED_IN_OUT', isLoggedIn} )


export const getAllPostsTC = () => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await postAPI.getAllPosts()
        dispatch(setAllPosts(res.data.posts))
        console.log(res.data)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
