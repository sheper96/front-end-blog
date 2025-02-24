import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Profile.module.css";




const Profile = () => {
        const { userInfo } = useSelector(state => state)
    console.log(userInfo)

 

    return (
        <div className={styles.container}>
            Profile
        </div>
      );
    
    

}

export default Profile;
