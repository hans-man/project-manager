import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import DataTable from 'react-data-table-component';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = ({ token }: { token: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = [
    { name: "ID", selector: (row: User) => row.id, sortable: true, width: '70px' },
    { name: "이름", selector: (row: User) => row.name, sortable: true },
    { name: "이메일", selector: (row: User) => row.email, sortable: true },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`사용자를 가져오지 못했습니다: ${err.response.data.message || err.response.statusText}`);
        } else {
          setError('사용자를 가져오는 중 예기치 않은 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    } else {
      setLoading(false);
      setError('인증 토큰이 없습니다.');
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
        <Box sx={{ width: '100%', mt: 2 }}>
          <DataTable
            columns={columns}
            data={users}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
          />
        </Box>
      </Box>
    </Container>
  );
};

export default UserList;
