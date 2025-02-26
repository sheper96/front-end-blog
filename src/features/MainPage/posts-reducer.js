import {postAPI} from '../../app/api'
import { setAppStatusAC } from '../../app/app-reducer'

const initialState = {
    postsData : [],
    post : null
}

export const postsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "POST/SET-ALL-POSTS":
            return {...state, postsData: action.postsData}
        case "POST/SET-POST-BY-ID":
            debugger
            return {...state, post: action.post}
      
        default :
            return state
    }
}

export const setAllPosts = (postsData) => {
    return {type: "POST/SET-ALL-POSTS", postsData: postsData} 
}
export const setPostById = (post) => {
    return {type: "POST/SET-POST-BY-ID", post: post} 
}


export const getAllPostsTC = (page) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await postAPI.getAllPosts(page)
        dispatch(setAllPosts(res.data))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const getAllMyPostsTC = (page) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await postAPI.getAllMyPosts(page)
        dispatch(setAllPosts(res.data))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const getPostByIdTC = (postId) => async (dispatch) => {
    debugger
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await postAPI.getPostById(postId)
        dispatch(setPostById(res.data.post))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const updatePostByIdTC = (postId,title,content) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await postAPI.editPostById(postId,title,content)
        dispatch(setPostById(res.data.post))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createPostTC = (title,content) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await postAPI.createPost(title,content)
        dispatch(setPostById(res.data.post))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const deletePostTC = (postId) => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await postAPI.deletePost(postId)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

