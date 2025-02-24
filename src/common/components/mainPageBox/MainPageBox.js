import React from 'react'
import {Box, Button} from "@mui/material"
import s from './mainPageBox.module.css'


const BoxContainerStyle = {
    py: '35px',
    px: '33px',
    bgcolor: '#fff',
    width: '1100px',
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    display: "flex",
    flexDirection: 'column',
    '& .MuiTextField-root': {my: 1.5, font: 'Montserrat'}
}

const MainPageBoxContainer = (props) => {
    return (
        <Box sx={BoxContainerStyle}>
            <div className={s.header}>
                <h2 className={s.title}>{props.title}</h2>
                <div className={s.button}>
                    {props.buttonTitle && props.buttonCallback && <Button
                        onClick={props.buttonCallback}
                        variant="contained" size="medium" sx={{borderRadius: 7.5, mt: 4}}>{props.buttonTitle}</Button>}
                </div>
            </div>
            {props.children}
        </Box>
    );
};

export default MainPageBoxContainer;