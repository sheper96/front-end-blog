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

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return <div >
      {/* <div className={s.init}> */}
      {/* <CircularProgress color="inherit"/> */}
      <h1>loading</h1>
    </div>
  }

  return (
    <div >
      <Router>
        <Header />
        <div className={styles.appContainer}>
          <div className={styles.app}>
            <Routes>
              <Route path={'/login'} element={<Login />}></Route>
              <Route path={'/registration'} element={<Registration />}></Route>
              <Route path={'/mainPage'} element={<MainPage />}></Route>
              <Route path={'/profile'} element={<Profile />}></Route>
            </Routes>
          </div >
        </div>
      </Router>
    </div>

  );
}

export default App;
