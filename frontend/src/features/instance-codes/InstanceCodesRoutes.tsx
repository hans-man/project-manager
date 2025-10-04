import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InstanceCodePage from '../../InstanceCodePage';

interface InstanceCodesRoutesProps {
  token: string;
}

const InstanceCodesRoutes: React.FC<InstanceCodesRoutesProps> = ({ token }) => {
  return (
    <Routes>
      <Route path="/" element={<InstanceCodePage token={token} />} />
    </Routes>
  );
};

export default InstanceCodesRoutes;