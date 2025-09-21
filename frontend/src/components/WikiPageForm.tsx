import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
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
        await axios.patch(`http://localhost:3001/wikis/${wikiPage.id}`, {
          title,
          content,
        });
      } else {
        // Create new wiki page
        // For now, hardcode projectId and authorId
        await axios.post('http://localhost:3001/wikis', {
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {wikiPage ? 'Edit Wiki Page' : 'Create New Wiki Page'}
      </Typography>
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
  );
};

export default WikiPageForm;
