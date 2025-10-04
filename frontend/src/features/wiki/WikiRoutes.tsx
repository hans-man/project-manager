import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListWiki from '../../components/ListWiki';
import SaveWiki from '../../components/SaveWiki';
import WikiPageDetail from '../../components/WikiPageDetail';

const WikiRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListWiki />} />
      <Route path="/new" element={<SaveWiki />} />
      <Route path="/:id" element={<WikiPageDetail />} />
      <Route path="/:id/edit" element={<SaveWiki />} />
    </Routes>
  );
};

export default WikiRoutes;
