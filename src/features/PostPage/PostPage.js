import { useEffect } from "react";
import React, { useState } from "react";
import styles from "./PostPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPostByIdTC, deletePostTC } from "../MainPage/posts-reducer";
import Button from '@mui/material/Button';



export function PostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const isInitialized = useSelector((state) => state.app.isInitialized)
  const post = useSelector((state) => state.posts.post)
  const { id } = useParams()
  const userId = useSelector((state) => state.auth.userInfo?.user?.id) ?? null;
  const authId = post?.author ?? null;

  const [isCurrentUserPost, setIsCurrentUserPost] = useState(false);

  useEffect(() => {
    if (post && userId) {
      setIsCurrentUserPost(userId === authId);
    }
  }, [post, userId, authId]);



  const editPostHandler = () => {
    navigate(`/editPost/${id}`, { state: { post } });
  };
  const deletePostHandler = (postId) => {
    if (postId) {
      dispatch(deletePostTC(postId))
      navigate('/mainPage');
    }

  };

  useEffect(() => {
    if (isInitialized && id) {
      dispatch(getPostByIdTC(id));
    }
  }, [dispatch, id, isInitialized]);


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {post && <div>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.content}>{post.content}</p>
        </div>}
        {isCurrentUserPost &&
          <div className={styles.btngroup}>
            <Button variant="contained" onClick={editPostHandler} size="medium">
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => deletePostHandler(id)} size="medium">
              Delete
            </Button>
          </div>
        }
      </div>
    </div>
  );
}
