import axios, { AxiosResponse } from 'axios'
// import {CardsType, CardsUrlType } from '../features/Card/cards-reducer';
// import { UserProfileType } from '../features/Login/auth-reducer';
// import {PackType, UrlParamsType } from '../features/Packs/packs-reducer';

export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:4000',
    withCredentials: true,
    "Content-Type": "application/json; charset=utf-8"

})

// const herokuInstance = axios.create({
//     baseURL: 'https://neko-back.herokuapp.com/2.0/',
//     withCredentials: true,
// })

export const authAPI = {
    register(data) {
        return instance.post('/auth/register', data);
    },
    authMe() {
        return instance.get('/auth/me');
    },
    login(data) {
        return instance.post('/auth/login', data);
    },
    logOut() {
        debugger
        return instance.post('auth/logout');
    },
   
}

export const postAPI = {

    getAllPosts(page = '1') {
        return instance.get('/post', {
            params: { page }
        });
    },
    getAllMyPosts(page = '1') {
        return instance.get('/post/my', {
            params: { page }
        });
    },
    getPostById(postId) {
        return instance.get(`/post/${postId}`);
    },
    editPostById(postId, title, content) {
        return instance.put(`/post/${postId}`, {
            title: title,
            content: content
        });
    },
    createPost(title, content) {
        return instance.post('/post', {
            title: title,
            content: content
        });
    },
    deletePost(postId) {
        return instance.delete(`/post/${postId}`);
    }

}


