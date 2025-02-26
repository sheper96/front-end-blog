import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from '../features/Login/Login';
import Registration from '../features/Registration/Registration';
import { createTheme } from '@mui/material/styles'
import { MainPage } from '../features/MainPage/MainPage';
import { initializeAppTC } from './app-reducer'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../common/components/Header/Header'
import Profile from '../features/Profile/Profile'
import { EditPost } from '../features/EditPost/EditPost'
import { PostPage } from '../features/PostPage/PostPage'
import { AddPost } from '../features/AddPost/AddPost';
import CircularProgress from '@mui/material/CircularProgress';

export const font = "'Montserrat', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
  },
  palette: {
    primary: {
      main: '#366EFF',
    }
  },
});


function App() {
  const dispatch = useDispatch()
  const isInitialized = useSelector((state) => state.app.isInitialized)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.init}>
        <CircularProgress color="inherit" />
        <h1>loading</h1>
      </div>)
  }

      return (
      <div >
        <Router>
          {isLoggedIn && <Header />}
          <div className={styles.appContainer}>
            <div className={styles.app}>
              <Routes>
                <Route path={'/login'} element={<Login />}></Route>
                <Route path={'/registration'} element={<Registration />}></Route>
                <Route path={'/mainPage'} element={<MainPage />}></Route>
                <Route path={'/profile'} element={<Profile />}></Route>
                <Route path={'/editPost/:id'} element={<EditPost />}></Route>
                <Route path={'/addPost'} element={<AddPost />}></Route>
                <Route path={'/post/:id'} element={<PostPage />}></Route>
              </Routes>
            </div >
          </div>
        </Router>
      </div>

      );
}

      export default App;
