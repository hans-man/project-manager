import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Alert,
  Grid, // Import Grid
  Card, // Import Card
  CardContent, // Import CardContent
} from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = ({ token }: { token: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(Array.isArray(response.data) ? response.data : []); // Defensive check
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`사용자를 가져오지 못했습니다: ${err.response.data.message || err.response.statusText}`);
        } else {
          setError('사용자를 가져오는 중 예기치 않은 오류가 발생했습니다.');
        }
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom sx={{ mb: 3 }}>
          등록된 사용자
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        {users.length > 0 ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card variant="elevation" elevation={3} sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          !error && <Typography sx={{ mt: 2 }}>사용자를 찾을 수 없거나 로딩 중입니다...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserList;