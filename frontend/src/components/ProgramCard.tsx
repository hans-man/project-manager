
import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Program {
  id: number;
  column1: string;
  column2: string;
  // ... other columns
}

interface ProgramCardProps {
  program: Program;
  onDelete: (id: number) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onDelete }) => {
  return (
    <Card elevation={3} sx={{ borderRadius: '8px', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {program.column1}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {program.column2}
        </Typography>
        {/* Add more fields as needed */}
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton component={Link} to={`/program-list/${program.id}/edit`} size="small">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(program.id)} size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProgramCard;
