import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListProgramColumnName from '../../components/ListProgramColumnName';
import SaveProgramColumnName from '../../components/SaveProgramColumnName';

const ProgramColumnNameRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListProgramColumnName />} />
      <Route path="/new" element={<SaveProgramColumnName />} />
      <Route path="/:projectId/:columnId/edit" element={<SaveProgramColumnName />} />
    </Routes>
  );
};

export default ProgramColumnNameRoutes;
