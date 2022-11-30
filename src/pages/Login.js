import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import {login, logout, selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

function Login({handleChange}, setIsAuth) {

    let navigate = useNavigate();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const paperStyle={padding: 20, height: '70.5vh', width: 300, margin: '0px auto'}
    const avatarStyle={backgroundColor: '#1bbd7e', margin: '20px 0'}
    const btnstyle={margin: '10px', width: '100%', background: 'green'}
    const h2 = {margin: '10px'}
    const txtf={margin: '10px', width: '100%'}
    const txtfd={margin: '10px', marginbottom: '30px', width: '100%'}
    const w={width: 'auto'}
    const fc={margin: '10px'}
    const tp={margin: '10px', color: 'green'}
    const l={fontSize: '18px', color: 'green'}

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const SignIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then(
            (userAuth) => {
                dispatch(
                    login({
                        email:userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        phone: userAuth.user.phone
                    })
                )
                console.log(userAuth)
                localStorage.setItem("isAuth", true)
                navigate('/createpost')
            }
        ).catch(error => alert(error));
    }

  return (
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockIcon/></Avatar>
                <h2 style={h2}>Sign in</h2>
            </Grid>
            <TextField type='email' style={txtf} value={email} onChange={(e)=>setEmail(e.target.value)} label='Email' placeholder='Enter Email' fullwidth required/>
            <TextField style={txtfd} value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' placeholder='Enter Password' type='password' fullwidth required/>
            <FormControlLabel style={fc}
                control={
                    <CheckBoxIcon
                        name="checkedB"
                        color="green"
                        background='green'
                    />
                }
                label="Remember me"
            />
            <div/>
            <Button style={btnstyle} onClick={SignIn} variant='contained'  fullwidth>Sign in</Button>
            <Typography style={tp}>
                <Link href="#" style={l}>
                    Forgot password ?
                </Link>
            </Typography>
            <Typography style={tp}> Do you have an account ?
                <Link style={l} href="#" onClick={()=>handleChange("event", 1)} >
                    Sign Up
                </Link>
            </Typography>
        </Paper>
    </Grid>
  )
}

export default Login
