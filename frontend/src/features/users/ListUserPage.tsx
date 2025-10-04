import React from 'react';
import ListUser from '../../components/ListUser';
import { Typography, Box } from '@mui/material';

interface UserListPageProps {
  token: string;
}

const UserListPage: React.FC<UserListPageProps> = ({ token }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {token ? <ListUser token={token} /> : <p>사용자 목록을 보려면 로그인하십시오.</p>}
    </Box>
  );
};

export default UserListPage;