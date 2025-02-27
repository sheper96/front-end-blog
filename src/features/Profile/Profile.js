import {Button, TextField} from "@mui/material"
import BoxContainer from "../../common/components/BoxContainer/BoxContainer"
import { useSelector,useDispatch } from "react-redux";
import styles from './Profile.module.css'
import { useNavigate } from "react-router-dom";
import React, { useState ,useEffect} from "react";
import {logOutTC } from "../Login/auth-reducer"
import { SvgSelector } from '../../common/components/SvgSelector/svgSelector'
import avatar from '../../app/assets/images/avatar.jpg'

const Profile = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let nameAuth=useSelector(state=>state.auth?.userInfo?.user?.userName)
    let email=useSelector(state=>state.auth.userInfo?.user.email)
    let isLoggedIn=useSelector(state=>state.auth.isLoggedIn)
    const [name, setName] = useState(nameAuth)
    const [editmode, setEditMode] = useState(false)
    const setNameHandler = (e) => {
        setName(e.currentTarget.value)
    }
    const updateStatusHandler = () => {
        setEditMode(false)
    }

    
    
    return (
        <div className={styles.container}>
            <div className={styles.backToCardsBlock}>
            </div>
            <BoxContainer title={'Personal Information'}>
                <div className={styles.profile}>
                    <div className={styles.avatarContainer}>
                        <img className={styles.avatar}
                             src={avatar}
                             alt={'user-avatar'}
                        />
                        <div
                            className={styles.photoButton}
                            onClick={()=>alert('will be soon')}
                        >
                            <SvgSelector svgName={'photo'}/>
                        </div>
                    </div>
                    <div onClick={() => setEditMode(true)}>
                        {!editmode && <span className={styles.name}>
                       {nameAuth}  <SvgSelector svgName={"pencil"}/></span>}
                    </div>
                    <div onBlur={updateStatusHandler}>
                        {editmode &&
                            <TextField autoFocus value={name} onChange={setNameHandler} id="standard-basic" label="Name" variant="standard" />}
                    </div>
                    <span className={styles.email}>{email}</span>
                    <Button
                        onClick={() => dispatch(logOutTC())}
                        style={{
                            backgroundColor: "#ffffff",
                            color: '#000'
                        }} variant="contained" size="large" sx={{borderRadius: 7.5}}>
                        Log Out</Button>
                </div>
            </BoxContainer>
        </div>
    )
}

export default Profile;
