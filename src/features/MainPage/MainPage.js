import { getAllPostsTC, getAllMyPostsTC } from './posts-reducer'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import styles from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const MainPage = () => {

    const isInitialized = useSelector((state) => state.app.isInitialized)
    const posts = useSelector((state) => state.posts.postsData.posts)
    const postsData = useSelector((state) => state.posts.postsData)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("all");


    const addPostHandler = () => {
        navigate(`/addPost`);
    }

    const paginationHandler = (value) => {
        if (activeTab === 'all') {
            dispatch(getAllPostsTC(value))
        }
        else {
            dispatch(getAllMyPostsTC(value))
        }

    };
    const getAllMyPostsHandler = () => {
        setActiveTab('my')
        dispatch(getAllMyPostsTC())
    };
    const getAllPostsHandler = () => {
        setActiveTab('all')
        dispatch(getAllPostsTC())
    };
    let isLoggedIn = useSelector(state => state.auth.isLoggedIn)




    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        else if (isInitialized) {
            dispatch(getAllPostsTC());
        }
    }, [dispatch, isLoggedIn, dispatch, navigate]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.postsButtons}>
                    <Button variant="contained" size="medium" onClick={getAllPostsHandler}>
                        All Posts
                    </Button>
                    <Button variant="contained" size="medium" onClick={getAllMyPostsHandler}>
                        My Posts
                    </Button>
                </div>
                <Button variant="contained" size="medium" onClick={addPostHandler}>
                    Add Post
                </Button>
            </div>
            <div className={styles.postsContainer}>
                {posts && posts.map((post) => (
                    <div key={post.id} className={styles.post}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <Link to={`/post/${post._id}`} className={styles.readMore}>
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <Pagination count={postsData.pages} onChange={(event, value) => paginationHandler(value)} color="primary" />
            </div>
        </div>
    );



}

