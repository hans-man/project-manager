import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import IssueCard, { Issue } from './IssueCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  issues: Issue[];
  onCardClick: (id: number) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, issues, onCardClick }) => {
  return (
    <Paper sx={{ width: 300, minWidth: 300, mx: 1, p: 1, bgcolor: 'grey.100', height: 'fit-content' }}>
      <Typography variant="h6" sx={{ p: 1, mb: 1, borderBottom: '1px solid', borderColor: 'grey.300' }}>
        {title}
      </Typography>
      <SortableContext id={id} items={issues.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <Box sx={{ minHeight: 100, display: 'flex', flexDirection: 'column' }}>
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} onClick={onCardClick} />
          ))}
        </Box>
      </SortableContext>
    </Paper>
  );
};

export default KanbanColumn;
