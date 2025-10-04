import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListIssue from '../../components/ListIssue';
import SaveIssue from '../../SaveIssue';

interface IssuesRoutesProps {
  token: string;
}

const IssuesRoutes: React.FC<IssuesRoutesProps> = ({ token }) => {
  return (
    <Routes>
      <Route path="/" element={<ListIssue token={token} />} />
      <Route path="/new" element={<SaveIssue />} />
      <Route path="/:id/edit" element={<SaveIssue />} />
    </Routes>
  );
};

export default IssuesRoutes;
