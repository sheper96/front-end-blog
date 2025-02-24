import { getAllPostsTC } from './posts-reducer'
import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPageBoxContainer from '../../common/components/mainPageBox/MainPageBox'
import s from '../../common/components/mainPageBox/mainPageBox.module.css'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styles from "./MainPage.module.css";

import { Link } from "react-router-dom";



export const MainPage = () => {

    //const { posts } = useSelector(state => state.posts?.posts )
    //console.log(posts)
    // const isInitialized = useSelector((state) => state.app.isInitialized)
    // const posts = useSelector((state) => state.posts.posts)
    
   
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if (isInitialized){
    //     dispatch(getAllPostsTC());
    //     }
    // }, [dispatch]);
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulate fetching posts
    setTimeout(() => {
      setPosts([
        { id: 1, title: "First Blog Post", excerpt: "This is an excerpt of the first post..." },
        { id: 2, title: "Second Blog Post", excerpt: "This is an excerpt of the second post..." },
        { id: 3, title: "Second Blog Post", excerpt: "This is an excerpt of the second post..." },
        { id: 4, title: "Second Blog Post", excerpt: "This is an excerpt of the second post..." },
        { id: 5, title: "Second Blog Post", excerpt: "This is an excerpt of the second post..." },
        { id: 6, title: "Second Blog Post", excerpt: "This is an excerpt of the second post..." },
        { id: 7, title: "Second Blog Post", excerpt: "This is an excerpt of the second post..." },
        { id: 8, title: "Second Blog Post", excerpt: "This is an excerpt of the second post..." },
        { id: 9, title: "Second Blog Post", excerpt: "This is an excerpt of the second post..." },
      ]);
    }, 1000);
  }, []);

    // return (<div>
    //     <MainPageBoxContainer title={"Pack List"} buttonTitle={'buttonTitle'} buttonCallback={'buttonHandler'}>
    //         <div className={s.learnButton}>
    //             <Button
    //                 onClick={() => console.log(123)}
    //                 variant="contained" size="large" sx={{ borderRadius: 7.5, mt: 4 }}>Learn</Button>
    //         </div>
    //         <TableContainer component={Paper}>
    //             <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell>Question</TableCell>
    //                         <TableCell align="right">Answer</TableCell>
    //                         <TableCell align="right">Last Updated</TableCell>
    //                         <TableCell align="right">Grade</TableCell>
    //                         {'isAuthor' && <TableCell align="right">Actions</TableCell>}
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>

    //                     {posts && posts.map((post) => (
    //                            // <CardsTableRows key={c._id} cards={c}/>
    //                             <h1 key={post._id}>{post.title}</h1>
    //                         ))}
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //     </MainPageBoxContainer>

    //     {/* <ModalContainerTwo open={open} handleClose={handleClose} title={'add new card'}>
    //             <ModalAddNewCard handleClose={handleClose} addNewCardActive={addNewCardActive}
    //                              setNewPackActive={setAddNewCardActive} packId={cardsUrlParams.cardPackId}/>
    //         </ModalContainerTwo> */}
    // </div>)
    return (
        <div className={styles.container}>
          <h1 className={styles.header}>Welcome to the Blog</h1>
          <div className={styles.postsContainer}>
            {posts.slice(0, 9).map((post) => (
              <div key={post.id} className={styles.post}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <Link to={`/post/${post.id}`} className={styles.readMore}>
                Read More →
              </Link>
            
              </div>
            ))}
          </div>
        </div>
      );
    
    

}

