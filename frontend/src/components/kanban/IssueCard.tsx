import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Full Issue interface
interface Project {
  id: number;
  name: string;
}
export interface Issue {
  id: number;
  title: string;
  description: string;
  taskName: string;
  testClassification: string;
  testRound: number;
  programId: string;
  programName: string;
  programDescription: string;
  assigneeName: string;
  developmentDueDate: string;
  developmentCompletionDate: string;
  status: string;
  managerName: string;
  managerReviewCompletionDate: string;
  businessOwnerName: string;
  businessOwnerReviewCompletionDate: string;
  project: Project;
  createdAt: string;
  updatedAt: string;
}

interface IssueCardProps {
  issue: Issue;
  onClick: (id: number) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(issue.id)}
      sx={{ mb: 1 }}
    >
      <Card elevation={2} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography variant="body1" component="div">
            {issue.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              ID-{issue.id}
            </Typography>
            {issue.assigneeName && (
              <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                {issue.assigneeName.charAt(0)}
              </Avatar>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IssueCard;
