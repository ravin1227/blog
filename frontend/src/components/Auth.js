import React, { useState } from 'react'
import {Box, Button, TextField, Typography} from "@mui/material"
import axious from "axios";
import { useDispatch } from "react-redux"
import { authActions } from '../store';
import { useNavigate } from "react-router-dom"

function Auth() {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange =(e)=>{
    setInput((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const sendRequest =async (type="login") =>{
    const res = await axious
     .post(`http://localhost:5000/api/user/${type}`,{
      name:input.name,
      email: input.email,
      password: input.password
    }).catch(err=>console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(input);
    if(isSignup){
      sendRequest("signup")
      .then((data)=>localStorage.setItem("userId", data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data))
    }else{
      sendRequest()
      .then((data)=>localStorage.setItem("userId", data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data))
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box 
        maxWidth={400}
        display="flex" 
        flexDirection={'column'}
        alignItems="center"
        justifyContent={"center"}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadius={5}
       >
        <Typography 
          variant='h2' 
          padding={3} 
          textAlign='center'
        >
          {isSignup ? "Signup" : "Login"}
        </Typography>
        {isSignup && <TextField name="name" 
          onChange={handleChange} 
          value={input.name}  placeholder='Name' margin='normal' />}
        <TextField 
          name="email" 
          onChange={handleChange} 
          value={input.email} 
          type={'email'} 
          placeholder='Email' 
          margin='normal' 
        />
        <TextField 
          name="password" 
          onChange={handleChange} 
          value={input.password} 
          type={'password'} 
          placeholder='Password ' 
          margin='normal' 
        />
        <Button type='submit'
          variant='contained' 
          sx={{borderRadius:3, marginTop: 3}} 
          color ="warning"
          >
          Submit
        </Button>
        <Button 
          onClick={()=> setIsSignup(!isSignup)} 
          sx={{borderRadius:3, marginTop: 3}}
        >
          Change To {isSignup ? "Login": "Signup"} 
        </Button>
      </Box>
    </form>
  )
}

export default Auth