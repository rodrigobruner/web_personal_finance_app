"use client";
import { Box, Button, Divider, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Link, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useTranslations} from 'next-intl';
import Paper from '@mui/material/Paper';
import React from 'react';
import axios from 'axios';
import { FieldValidationHelper } from '@/types';



export default function Login() {
    // Get translations
    const t = useTranslations('Components.Login');

    // State
    const [showPassword, setShowPassword] = React.useState(false);
    const [user, setUser] = React.useState<FieldValidationHelper>({
        username:{
            value: '',
            error: false,
            helperText: t('error.required-username')
        },
        password:{
            value: '',
            error: false,
            helperText: t('error.required-password')
        }
    });

    // Password visibility
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]:{
                ...user[name],
                value
            }
        })
    }

    // Handle form submit
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser = {...user};
        newUser.username.error = false;
        newUser.password.error = false;

        let error = false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(user.username.value == "" || !emailRegex.test(user.username.value)){
            newUser.username.error = true;
            error = true;
        }
        
        if(user.password.value == ""){
            newUser.password.error = true;
            error = true;
        }

        if(!error){
            axios.get('/user', {
                                    params: {
                                        username: newUser.username.value,
                                        password: newUser.password.value
                                    }
                                })
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
        setUser(newUser);
        console.log(user);        
    }

    return (
        <Paper elevation={3} sx={{ width: '30%', minWidth: '100px', padding:'20px'}}>
            <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign:'center' }}>
                {t('title')}
            </Typography>
            <Box component="form"  onSubmit={onSubmit}>
                <FormControl sx={{ width: '100%'}}>
                    <InputLabel htmlFor="username">
                        {t('username')}
                    </InputLabel>
                    <Input
                        id="username"
                        name='username'
                        sx={{ width: '100%'}}
                        onChange={handleChange}
                        />
                        <FormHelperText error>
                            {user.username.error? 
                                user.username.helperText : ""
                            }
                        </FormHelperText>
                
                </FormControl>
                <FormControl sx={{ width: '100%',marginTop: '20px'}}>
                    <InputLabel htmlFor="password">
                        {t('password')}
                    </InputLabel>
                    <Input
                        id="password"
                        name='password'
                        sx={{ width: '100%' }}
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        error={user.password.error}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error>
                        {user.password.error ? 
                            user.password.helperText:""
                        }
                    </FormHelperText>
                </FormControl>
                <Button 
                    sx={{ 
                            width: '100%', 
                            marginBottom: '20px', 
                            marginTop: '30px' 
                        }}
                    variant="contained"
                    type='submit' 
                    size="large"
                >
                    {t('signin-button')}
                </Button>
            </Box>
            <Divider sx={{margin:'20px'}}/>
            <Box sx={{ display: 'flex'}}>
                <Box sx={{ 
                            float:'left', 
                            width:'50%'
                        }}>
                    <Link                         
                        href="#" 
                        underline="hover" 
                        sx={{float:'left'}}>
                        {t('forgot-password')}
                    </Link>
                </Box>
                <Box sx={{ 
                            float:'left', 
                            width:'50%'
                        }}>
                    <Link 
                        href="#" 
                        underline="hover" 
                        sx={
                            {float:'right'}
                        }>
                        {t('create-account')}
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
}