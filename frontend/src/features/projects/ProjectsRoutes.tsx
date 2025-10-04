import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListProject from '../../components/ListProject';
import SaveProject from '../../components/SaveProject';

interface ProjectsRoutesProps {
  currentUserId?: number;
  token: string;
}

const ProjectsRoutes: React.FC<ProjectsRoutesProps> = ({ currentUserId }) => {
  return (
    <Routes>
      <Route path="/" element={<ListProject />} />
      <Route path="/new" element={<SaveProject currentUserId={currentUserId} />} />
      <Route path="/:id/edit" element={<SaveProject currentUserId={currentUserId} />} />
    </Routes>
  );
};

export default ProjectsRoutes;
