import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import s from './Header.module.css'
import {useAppDispatch, useAppSelector} from '../../hooks/react-redux-hooks'
import {useSelector} from "react-redux";
import {Box, LinearProgress} from '@mui/material'
import { NavLink , Navigate} from 'react-router-dom'
import {useState} from 'react'
import { logOutTC } from '../../../features/Login/auth-reducer'

const Header = () => {
    const isOpen = useSelector(state => state.app.status)

    const dispatch = useAppDispatch()
    const [isActive, setIsActive] = useState(false)
    const setActiveHandler = () => {
        setIsActive(!isActive)
    }
    const name = useAppSelector(state => state.auth.userInfo?.name)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const logOutHandler = () => {
        dispatch(logOutTC())
        setActiveHandler()
    }

    return (
        <AppBar color="inherit" position="static">
            <Toolbar>
                <Box className={s.box} px={10} width="100%">
                    {isLoggedIn ?
                        <div className={s.button} onClick={setActiveHandler}>
                            <div className={s.name}>
                                <h3>LOGO</h3>
                            </div>
                            {/* <div className={s.img}>
                                <img
                                    src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"/>
                            </div> */}
                        </div>
                        : <Button variant="contained" size="large" color="primary" sx={{borderRadius: 7.5}}>Sing
                            in</Button>}
                    {
                        <div >
                          
                                <div>
                                    <NavLink
                                        to={'/mainPage'}
                                        //className={s.nav}
                                        //onClick={setActiveHandler}
                                    >
                                        {/* <SvgSelector svgName={"profile"}/> Profile */}
                                        <h1>Blog</h1>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink
                                        to={'/profile'}
                                        //className={s.nav}
                                        //onClick={logOutHandler}
                                    >
                                        {/* <SvgSelector svgName={"logOut"}/> Log out */}
                                        <h1>Profile</h1>
                                    </NavLink>
                             
                            </div>
                        </div>
                    }
                </Box>
            </Toolbar>
            {isOpen === 'loading' ? <LinearProgress/> : ''}
        </AppBar>
    );
};

export default Header;