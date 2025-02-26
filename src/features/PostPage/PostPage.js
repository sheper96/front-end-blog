import { useEffect } from "react";
import styles from "./PostPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPostByIdTC, deletePostTC } from "../MainPage/posts-reducer";
import Button from '@mui/material/Button';


export function PostPage() {
  const navigate = useNavigate();
  const isInitialized = useSelector((state) => state.app.isInitialized)
  const post = useSelector((state) => state.posts.post)
  const { id } = useParams()
  const userId = useSelector((state) => state.auth.userInfo.user.id)
  const authId = post ? post.author : null;
  let isCurrentUserPost = false
  if (userId && authId) {
    isCurrentUserPost = userId == authId;
   
    console.log(typeof authId ,typeof userId )
  }
  

  const editPostHandler = () => {
    navigate(`/editPost/${id}`, { state: { post } });
  };
  const deletePostHandler = (postId) => {
    dispatch(deletePostTC(postId))
    navigate('/mainPage');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitialized) {
      dispatch(getPostByIdTC(id));
    }
  }, [dispatch, id]);

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
