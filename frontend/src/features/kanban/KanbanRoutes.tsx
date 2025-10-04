import React from 'react';
import { Routes, Route } from 'react-router-dom';
import KanbanBoardPage from '../../components/kanban/KanbanBoardPage';

interface KanbanRoutesProps {
  token: string;
}

const KanbanRoutes: React.FC<KanbanRoutesProps> = ({ token }) => {
  return (
    <Routes>
      <Route path="/" element={<KanbanBoardPage token={token} />} />
    </Routes>
  );
};

export default KanbanRoutes;
