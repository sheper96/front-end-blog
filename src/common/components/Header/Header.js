import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import styles from './Header.module.css'
import { useAppDispatch } from '../../hooks/react-redux-hooks'
import { useSelector } from "react-redux";
import { Box, LinearProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { logOutTC } from '../../../features/Login/auth-reducer'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const isOpen = useSelector(state => state.app.status)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [isActive, setIsActive] = useState(false)
    const setActiveHandler = () => {
        setIsActive(!isActive)
    }

    const logOutHandler = () => {
        debugger
        dispatch(logOutTC())
        setActiveHandler()
    }

    return (
        <AppBar color="inherit" position="static">
            <Toolbar>
                <Box className={styles.box} px={10} width="100%">
                    <div className={styles.name}>
                        <h3 onClick={() => navigate('/mainPage')}>MyBlog</h3>
                    </div>
                    <div>
                        <div className={styles.menu}>
                            <Link to="/mainPage" className={styles.nav}>Blog</Link>
                            <Link to="/profile" className={styles.nav}>Profile</Link>
                            <Link onClick={logOutHandler} className={styles.nav}>LogOut</Link>
                        </div>
                    </div>

                </Box>
            </Toolbar>
                {isOpen === 'loading' ? <LinearProgress /> : ''}
        </AppBar>
    );
};

export default Header;