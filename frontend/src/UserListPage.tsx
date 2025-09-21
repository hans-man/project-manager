import React from 'react';
import UserList from './components/UserList';

interface UserListPageProps {
  token: string | null;
}

const UserListPage: React.FC<UserListPageProps> = ({ token }) => {
  return (
    <div>
      <h2>사용자 목록</h2>
      {token ? <UserList token={token} /> : <p>사용자 목록을 보려면 로그인하십시오.</p>}
    </div>
  );
};

export default UserListPage;
