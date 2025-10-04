import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListProgram from '../../components/ListProgram';
import SaveProgram from '../../components/SaveProgram';

const ProgramListRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListProgram />} />
      <Route path="/new" element={<SaveProgram />} />
      <Route path="/:id/edit" element={<SaveProgram />} />
    </Routes>
  );
};

export default ProgramListRoutes;
