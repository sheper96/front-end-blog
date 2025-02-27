import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:4000',
    //baseURL: 'https://back-end-blog-i310.onrender.com',
    withCredentials: true,
    "Content-Type": "application/json; charset=utf-8"

})

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


