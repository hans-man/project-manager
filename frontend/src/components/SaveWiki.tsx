import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface WikiPageFormProps {
  wikiPage?: {
    id: number;
    title: string;
    content: string;
    projectId: number;
    authorId: number;
  };
}

const WikiPageForm: React.FC<WikiPageFormProps> = ({ wikiPage }) => {
  const [title, setTitle] = useState(wikiPage?.title || '');
  const [content, setContent] = useState(wikiPage?.content || '');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (wikiPage) {
        // Update existing wiki page
        await api.patch(`/wikis/${wikiPage.id}`, {
          title,
          content,
        });
      } else {
        // Create new wiki page
        // For now, hardcode projectId and authorId
        await api.post('/wikis', {
          title,
          content,
          projectId: 1, // TODO: Replace with actual project ID
          authorId: 1, // TODO: Replace with actual author ID
        });
      }
      navigate('/wiki');
    } catch (error) {
      console.error('Error saving wiki page:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card elevation={3} sx={{ p: 2, borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            {wikiPage ? 'Edit Wiki Page' : 'Create New Wiki Page'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              {wikiPage ? 'Update Wiki Page' : 'Create Wiki Page'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WikiPageForm;
