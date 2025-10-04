import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import IssueDetailModal from './IssueDetailModal'; // Import the modal
import { Issue } from './IssueCard'; // Import the full Issue type
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

interface Project {
  id: number;
  name: string;
}

// Define a canonical order for columns
const COLUMN_ORDER: { [key: string]: number } = {
  'To Do': 1,
  'In Progress': 2,
  'Done': 3,
};

interface KanbanBoardPageProps {
  token: string;
}

const KanbanBoardPage: React.FC<KanbanBoardPageProps> = ({ token }) => {
  const [columns, setColumns] = useState<{ [key: string]: Issue[] }>({});
  const [orderedColumnIds, setOrderedColumnIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null); // State for modal
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectIssueCounts, setProjectIssueCounts] = useState<{[key: number]: number}>({});
  const [statusIssueCounts, setStatusIssueCounts] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const fetchIssues = async () => {

      try {
        const [issuesResponse, projectsResponse] = await Promise.all([
          axios.get('/issues', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/projects', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const issues: Issue[] = issuesResponse.data;
        setProjects(projectsResponse.data);
        const groupedColumns = issues.reduce((acc, issue) => {
          const status = issue.status || 'Uncategorized';
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(issue);
          return acc;
        }, {} as { [key: string]: Issue[] });

        // Calculate issue counts per project
        const projectCounts: {[key: number]: number} = {};
        issues.forEach(issue => {
          if (issue.project?.id) {
            projectCounts[issue.project.id] = (projectCounts[issue.project.id] || 0) + 1;
          }
        });
        setProjectIssueCounts(projectCounts);

        // Calculate issue counts per status
        const statusCounts: {[key: string]: number} = {};
        Object.keys(groupedColumns).forEach(status => {
          statusCounts[status] = groupedColumns[status].length;
        });
        setStatusIssueCounts(statusCounts);

        const sortedColumnIds = Object.keys(groupedColumns).sort((a, b) => {
          const orderA = COLUMN_ORDER[a] || 99;
          const orderB = COLUMN_ORDER[b] || 99;
          return orderA - orderB;
        });

        setColumns(groupedColumns);
        setOrderedColumnIds(sortedColumnIds);
      } catch (err) {
        setError('Failed to fetch issues.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [token]);

  const findColumn = (issueId: string | number) => {
    return orderedColumnIds.find(columnId => columns[columnId].some(issue => issue.id === issueId));
  };

  const handleCardClick = (id: number) => {
    setSelectedIssueId(id);
  };

  const handleCloseModal = () => {
    setSelectedIssueId(null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    
    const originalColumn = findColumn(activeId);
    let overColumn = findColumn(overId);
    if (!overColumn) {
        if (orderedColumnIds.includes(String(overId))) {
            overColumn = String(overId);
        }
    }

    if (!originalColumn || !overColumn || originalColumn === overColumn) {
        if (originalColumn) {
            const items = columns[originalColumn];
            const oldIndex = items.findIndex(i => i.id === activeId);
            const newIndex = items.findIndex(i => i.id === overId);
            if (oldIndex !== newIndex) {
                setColumns(prev => ({
                    ...prev,
                    [originalColumn]: arrayMove(items, oldIndex, newIndex)
                }));
            }
        }
        return;
    }

    const movedIssue = columns[originalColumn].find(i => i.id === activeId);
    if (!movedIssue) return;

    const newStatus = overColumn;
    const previousColumns = { ...columns };

    setColumns(prev => {
        if (!originalColumn || !overColumn || !movedIssue) {
            return prev;
        }
        const newColumns = { ...prev };
        newColumns[originalColumn] = newColumns[originalColumn].filter(i => i.id !== activeId);
        newColumns[overColumn] = [movedIssue, ...(newColumns[overColumn] || [])];
        return newColumns;
    });

    try {
      await axios.patch(`/issues/${activeId}`, 
        { status: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      setError('Failed to update issue status. Reverting changes.');
      console.error(err);
      setColumns(previousColumns);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Project Issue Summary:</Typography>
        {projects.map(project => (
          <Typography key={project.id} variant="body2">
            {project.name}: {projectIssueCounts[project.id] || 0} issues
          </Typography>
        ))}
        <Typography variant="h6" sx={{ mt: 2 }}>Status Issue Summary:</Typography>
        {orderedColumnIds.map(status => (
          <Typography key={status} variant="body2">
            {status}: {statusIssueCounts[status] || 0} issues
          </Typography>
        ))}
      </Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Box sx={{ display: 'flex', overflowX: 'auto', p: 1, minHeight: '70vh' }}>
          {orderedColumnIds.map(columnId => (
            <KanbanColumn
              key={columnId}
              id={columnId}
              title={columnId}
              issues={columns[columnId] || []}
              onCardClick={handleCardClick}
            />
          ))}
        </Box>
      </DndContext>
      <IssueDetailModal 
        issueId={selectedIssueId}
        open={selectedIssueId !== null}
        onClose={handleCloseModal}
        token={token}
      />
    </Box>
  );
};

export default KanbanBoardPage;
