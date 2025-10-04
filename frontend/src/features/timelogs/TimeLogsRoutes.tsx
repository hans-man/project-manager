import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListTimeLog from '../../components/ListTimeLog';
import SaveTimeLog from '../../components/SaveTimeLog';

const TimeLogsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListTimeLog />} />
      <Route path="/new" element={<SaveTimeLog />} />
      <Route path="/:id/edit" element={<SaveTimeLog />} />
    </Routes>
  );
};

export default TimeLogsRoutes;
