import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserList from './components/UserList';
import IssueList from './components/IssueList';
import IssueForm from './IssueForm';
import UserListPage from './UserListPage'; // Import UserListPage component
import WikiPage from './components/WikiPage'; // Import WikiPage component
import WikiPageDetail from './components/WikiPageDetail'; // Import WikiPageDetail component
import WikiPageForm from './components/WikiPageForm'; // Import WikiPageForm component
import TimeLogPage from './components/TimeLogPage'; // Import TimeLogPage component
import TimeLogForm from './components/TimeLogForm'; // Import TimeLogForm component
import CostEntryPage from './components/CostEntryPage'; // Import CostEntryPage component
import CostEntryForm from './components/CostEntryForm'; // Import CostEntryForm component
import ProjectPage from './components/ProjectPage'; // Import ProjectPage component
import ProjectForm from './components/ProjectForm'; // Import ProjectForm component
import MainLayout from './components/MainLayout'; // Import MainLayout component
import { CssBaseline, Box } from '@mui/material';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLoginSuccess = (receivedToken: string) => {
    setToken(receivedToken);
    localStorage.setItem('jwtToken', receivedToken);
    alert('로그인 성공! 토큰 저장됨.');
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
    alert('로그아웃되었습니다.');
  };

  return (
    <Router>
      <CssBaseline />

      {token ? (
        <MainLayout handleLogout={handleLogout} token={token}>
          <Routes>
            <Route path="/" element={<IssueList token={token} />} />
            <Route path="/register-issue" element={<IssueForm />} />
            <Route path="/users" element={<UserListPage token={token} />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/wiki/new" element={<WikiPageForm />} />
            <Route path="/wiki/:id" element={<WikiPageDetail />} />
            <Route path="/wiki/:id/edit" element={<WikiPageForm />} />
            <Route path="/issues" element={<IssueList token={token} />} />
            <Route path="/timelogs" element={<TimeLogPage />} />
            <Route path="/timelogs/new" element={<TimeLogForm />} />
            <Route path="/timelogs/:id/edit" element={<TimeLogForm />} />
            <Route path="/costentries" element={<CostEntryPage />} />
            <Route path="/costentries/new" element={<CostEntryForm />} />
            <Route path="/costentries/:id/edit" element={<CostEntryForm />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/:id/edit" element={<ProjectForm />} />
          </Routes>
        </MainLayout>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          {showLogin ? <Login onLoginSuccess={handleLoginSuccess} /> : <SignUp />}
        </Box>
      )}
    </Router>
  );
}

export default App;