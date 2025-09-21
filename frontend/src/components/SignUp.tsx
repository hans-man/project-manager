import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Container, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { name, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users', {
        name,
        email,
        password,
      });
      setMessage(`사용자 생성 성공! 사용자 ID: ${response.data.id}`);
      setFormData({ name: '', email: '', password: '' }); // Clear form
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(`오류: ${error.response.data.message}`);
      } else {
        setMessage('예기치 않은 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4, // Add padding
          borderRadius: 2, // Rounded corners
          boxShadow: 3, // Add shadow for a card-like effect
          bgcolor: 'background.paper', // Use theme background color
        }}
      >
        {/* Placeholder for Logo */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            내 로고
          </Typography>
        </Box>

        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          회원가입
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={onChange}
            variant="outlined" // Use outlined variant for a cleaner look
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
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
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            회원가입
          </Button>
          {message && (
            <Typography color={message.startsWith('오류') ? 'error' : 'success'} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <MuiLink component={Link} to="/" variant="body2">
              로그인
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
