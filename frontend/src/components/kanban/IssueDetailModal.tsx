import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';

// Re-using the full Issue interface
interface Project {
  id: number;
  name: string;
}
interface Issue {
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

interface IssueDetailModalProps {
  issueId: number | null;
  open: boolean;
  onClose: () => void;
  token: string;
}

const DetailItem = ({ title, value }: { title: string; value: React.ReactNode }) => (
  <Box sx={{ width: { xs: '100%', sm: '50%' }, px: 1, mb: 2 }}>
    <Typography variant="caption" color="text.secondary">{title}</Typography>
    <Typography variant="body1">{value || '-'}</Typography>
  </Box>
);

const IssueDetailModal: React.FC<IssueDetailModalProps> = ({ issueId, open, onClose, token }) => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && issueId) {
      setLoading(true);
      setError(null);
      const fetchIssue = async () => {
        try {
          const response = await axios.get(`/issues/${issueId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIssue(response.data);
        } catch (err) {
          setError('Failed to fetch issue details.');
          console.error(err);
        }
        setLoading(false);
      };
      fetchIssue();
    }
  }, [issueId, open, token]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {issue ? `Issue #${issue.id}: ${issue.title}` : 'Loading...'}
      </DialogTitle>
      <DialogContent dividers>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {issue && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
              <DetailItem title="Status" value={<Chip label={issue.status} color="primary" size="small" />} />
              <DetailItem title="Project" value={issue.project?.name} />
              <DetailItem title="Assignee" value={issue.assigneeName} />
              <DetailItem title="Manager" value={issue.managerName} />
              <DetailItem title="Business Owner" value={issue.businessOwnerName} />
              <Divider sx={{ my: 1, width: '100%' }} />

              <DetailItem title="Description" value={issue.description} />
              <DetailItem title="Program Name" value={issue.programName} />
              <Divider sx={{ my: 1, width: '100%' }} />

              <DetailItem title="Development Due Date" value={formatDate(issue.developmentDueDate)} />
              <DetailItem title="Development Completion Date" value={formatDate(issue.developmentCompletionDate)} />
              <DetailItem title="Manager Review Completion Date" value={formatDate(issue.managerReviewCompletionDate)} />
              <DetailItem title="Business Owner Review Completion Date" value={formatDate(issue.businessOwnerReviewCompletionDate)} />
              
              <Divider sx={{ my: 1, width: '100%' }} />

              <DetailItem title="Created At" value={formatDate(issue.createdAt)} />
              <DetailItem title="Last Updated" value={formatDate(issue.updatedAt)} />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssueDetailModal;
