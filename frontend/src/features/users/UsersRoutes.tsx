import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListUserPage from './ListUserPage';

interface UsersRoutesProps {
  token: string;
}

const UsersRoutes: React.FC<UsersRoutesProps> = ({ token }) => {
  return (
    <Routes>
      <Route path="/" element={<ListUserPage token={token} />} />
    </Routes>
  );
};

export default UsersRoutes;
