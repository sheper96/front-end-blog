import React, {useState,useEffect} from 'react';
import BoxContainer from "../../common/components/BoxContainer/BoxContainer";
import {useFormik} from "formik";
import {Button, FormGroup, IconButton, InputAdornment} from "@mui/material";
import TextField from '@mui/material/TextField';
import {font} from "../../app/App";
import s from './registration.module.css'
import { useSelector,useDispatch } from "react-redux";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { registerTC } from '../Login/auth-reducer';
import {useNavigate} from "react-router-dom";


const Registration = () => {
    const dispatch = useDispatch()
    let [isShowPassword, setShowPassword] = useState(false);
    let isLoggedIn=useSelector(state=>state.auth.isLoggedIn)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            userName: '',
            password: '',
        },

        validate: (values) => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.userName) {
                errors.userName = 'User name is required'
            }
            if (values.password.length <= 4) {
                errors.password = 'Password must be 5 symbol'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            alert('registration succesfull')
            formik.resetForm();
        },
    });
    const handleClickShowPassword = () => {
        setShowPassword(!isShowPassword)
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
            if (isLoggedIn) {
                navigate('/profile')
            }
        }, [])

    return (
        <div className={s.container}>
            <BoxContainer title={'Sign Up'} subTextForm={'Already have an account?'} subLinkUrlText={'Sign Up'} subLinkUrl={'/login'} >
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            error={
                                Boolean(formik.errors.email && formik.touched.email)
                            }
                            helperText={
                                formik.errors.email &&
                                formik.touched.email &&
                                String(formik.errors.email)
                            }
                            label="Email"
                            type="text"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                            inputProps={{style: {fontFamily: font}}}
                            InputLabelProps={{style: {fontFamily: font}}}
                        />
                         <TextField
                            error={
                                Boolean(formik.errors.userName && formik.touched.userName)
                            }
                            helperText={
                                formik.errors.userName &&
                                formik.touched.userName &&
                                String(formik.errors.userName)
                            }
                            label="User name"
                            type="text"
                            margin="normal"
                            {...formik.getFieldProps('userName')}
                            inputProps={{style: {fontFamily: font}}}
                            InputLabelProps={{style: {fontFamily: font}}}
                        />
                        <TextField
                            error={
                                Boolean(formik.errors.password && formik.touched.password)
                            }
                            helperText={
                                formik.errors.password &&
                                formik.touched.password &&
                                String(formik.errors.password)
                            }
                            label="Password"
                            type={isShowPassword? "text": "password"}
                            margin="normal"
                            {...formik.getFieldProps('password')}
                            inputProps={{style: {fontFamily: font}}}
                            InputLabelProps={{style: {fontFamily: font}}}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                           {isShowPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        <Button sx={{borderRadius: 7.5, mt: 3}} type={'submit'} variant={'contained'} color={'primary'}>
                            Sing up
                        </Button>
                    </FormGroup>
                </form>
            </BoxContainer>
        </div>
    );
};

export default Registration;