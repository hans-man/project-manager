import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Container, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login = ({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
      const token = response.data.access_token;
      setMessage(`로그인 성공! 토큰: ${token}`);
      onLoginSuccess(token); // Pass the token to the parent component
      setFormData({ email: '', password: '' }); // Clear form
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(`오류: ${error.response.data.message || '잘못된 자격 증명'}`);
      } else {
        setMessage('예기치 않은 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)', // Placeholder background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Ensure it covers the full viewport height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4, // Add vertical padding
      }}
    >
      <Box
        sx={{
          marginTop: 0, // Remove top margin as container handles centering
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4, // Add padding
          borderRadius: 2, // Rounded corners
          boxShadow: 3, // Add shadow for a card-like effect
          bgcolor: 'background.paper', // Use theme background color
          width: '100%', // Ensure box takes full width of container
          maxWidth: '400px', // Limit max width for better aesthetics
        }}
      >
        {/* Placeholder for Logo */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            내 로고
          </Typography>
        </Box>

        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          계정에 로그인
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChange}
            variant="outlined" // Use outlined variant for a cleaner look
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChange}
            variant="outlined" // Use outlined variant for a cleaner look
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }} // Adjust padding for button
          >
            로그인
          </Button>
          {message && (
            <Typography color={message.startsWith('오류') ? 'error' : 'success'} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <MuiLink component={Link} to="#" variant="body2">
              비밀번호를 잊으셨나요?
            </MuiLink>
            <MuiLink component={Link} to="/signup" variant="body2">
              회원가입
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
