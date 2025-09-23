import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

import Login from './components/Login';
import SignUp from './components/SignUp'; // Import SignUp component

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

// Date Picker 관련 임포트
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


interface DecodedToken {
  sub: number; // Use 'sub' as the user ID property
  // Add other properties if your token contains them
}

function App() {
  console.log('App component rendered'); // Top-level log to check if App renders
  const [token, setToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken: DecodedToken = jwtDecode(storedToken);
        if (decodedToken && decodedToken.sub) {
          setCurrentUserId(decodedToken.sub);
          console.log('App.tsx useEffect - currentUserId set to:', decodedToken.sub); // Added console.log
        } else {
          console.error('Decoded token is missing the SUB property:', decodedToken);
          setToken(null);
          localStorage.removeItem('jwtToken');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setToken(null);
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  const handleLoginSuccess = (receivedToken: string) => {
    setToken(receivedToken);
    localStorage.setItem('jwtToken', receivedToken);
    try {
      const decodedToken: DecodedToken = jwtDecode(receivedToken);
      if (decodedToken && decodedToken.sub) {
        setCurrentUserId(decodedToken.sub);
        console.log('App.tsx handleLoginSuccess - currentUserId set to:', decodedToken.sub); // Added console.log
      } else {
        console.error('Decoded token after login is missing the SUB property:', decodedToken);
        setToken(null);
        localStorage.removeItem('jwtToken');
      }
    } catch (error) {
      console.error('Error decoding token after login:', error);
      setToken(null);
      localStorage.removeItem('jwtToken');
    }
    alert('로그인 성공! 토큰 저장됨.');
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUserId(undefined);
    localStorage.removeItem('jwtToken');
    alert('로그아웃되었습니다.');
  };

  return (
    <Router>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}> {/* LocalizationProvider 추가 */}
        <Routes>
          {token ? (
            <Route path="/*" element={
              <MainLayout handleLogout={handleLogout} token={token}>
                <Routes>
                  <Route path="/" element={<IssueList token={token} />} />
                  <Route path="/issues/new" element={<IssueForm />} />
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
                  <Route path="/projects/new" element={<ProjectForm currentUserId={currentUserId} />} />
                  <Route path="/projects/:id/edit" element={<ProjectForm currentUserId={currentUserId} />} />
                </Routes>
              </MainLayout>
            } />
          ) : (
            <Route path="/*" element={
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Routes>
                  <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} /> {/* Default to login */}
                </Routes>
              </Box>
            } />
          )}
        </Routes>
      </LocalizationProvider> {/* LocalizationProvider 닫기 */}
    </Router>
  );
}

export default App;
