import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {AppBar, Toolbar, Typography, Box, Button, Tabs, Tab} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
  const dispath =useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState( );
  return (
    <AppBar
      position='sticky' 
      sx={{ background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 66%, rgba(211,113,15,1) 100%)"}}>
        <Toolbar>
            <Typography varient ="h4">BlogsApp</Typography>
            { isLoggedIn && <Box display="flex" marginRight={'auto'} marginLeft={'auto'}>
              <Tabs textColor='inherit' value={value}  onChange={(e,val) => setValue(val)}>
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>

              </Tabs>
            </Box>}
            <Box  display="flex" marginLeft='auto'>
                { !isLoggedIn &&
                  <>
                    <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin: 1, borderRadius:10}} color ="warning">Login</Button>
                    <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin: 1, borderRadius:10}} color ="warning">Signup</Button>
                  </>
                }
                { isLoggedIn &&(
                  <Button 
                    onClick={()=> dispath(authActions.logout())}
                    LinkComponent={Link} to="/auth" 
                    variant='contained' 
                    sx={{margin: 1, borderRadius:10}} 
                    color ="warning">
                    Logout
                  </Button>
                )}
            </Box>
        </Toolbar> 
    </AppBar>
  )
}

export default Header;