import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import {login, logout, selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

function SignUp({ setIsAuth }) {

    let navigate = useNavigate();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const paperStyle={padding: 20, width:300, margin:'0px auto'}
    const headerStyle={margin: 0}
    const avatarStyle={backgroundColor: '#1bbd7e'}
    const marginTop = { marginTop: 5 }
    const tf={margin: '10px 0', width: '100%'}
    const btnstyle={background: 'green'}

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const SignUp = (e)=>{
        e.preventDefault();
        console.log(name)
        if (!name) {
            return alert("Please enter a full name!")
        }
        if (!email) {
            return alert("Please enter an email!")
        }
        if (!phone) {
            return alert("Please enter your phone number!")
        }

        auth.createUserWithEmailAndPassword( email, password).then(
            (userAuth) => {
                //console.log(userAuth.user.updateProfile);
                userAuth.user
                    .updateProfile({
                        displayName: name
                    })
            .then(()=>{
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                }),)
                localStorage.setItem("isAuth", true)
                navigate('/createpost')
            })
        }).catch((error) => alert(error));
    };
  return (
    <>
          <Grid>
              <Paper elevation={20} style={paperStyle}>
                  <Grid align='center'>
                      <Avatar style={avatarStyle}>
                          <AddCircleOutlineIcon />
                      </Avatar>
                      <h2 style={headerStyle}>Sign Up</h2>
                      <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                  </Grid>
                  <form>
                      <TextField style={tf} fullwidth label='Name' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}/>
                      <TextField style={tf} fullwidth label='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                      {/*<FormControl component='fieldset' style={marginTop}>
                          <FormLabel component='legend'>Gender</FormLabel>
                          <RadioGroup aria-label='gender' name="gender" style={{ display: 'initial' }}>
                              <FormControlLabel value="female" control={<Radio />} label="Female" />
                              <FormControlLabel value="male" control={<Radio />} label="Male" />
                          </RadioGroup>
  </FormControl>*/}
                      <TextField style={tf} fullwidth label='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                      <TextField style={tf} fullwidth label='Password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                      <FormControlLabel
                          control={<Checkbox name="checkedA" />}
                          label="I accept the terms and conditions."
                      />
                      <Button type='submit' onClick={SignUp} variant='contained' style={btnstyle} color='primary'>Sign Up</Button>
                  </form>
              </Paper>
          </Grid>
    </>
  )
}

export default SignUp
