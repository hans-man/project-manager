import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DataTable from 'react-data-table-component';

interface CostEntry {
  id: number;
  amount: number;
  date: string;
  description?: string;
  taskId: number;
  userId: number;
}

const CostEntryPage: React.FC = () => {
  const [costEntries, setCostEntries] = useState<CostEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchCostEntries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/costentries');
      setCostEntries(response.data);
    } catch (error) {
      console.error('Error fetching cost entries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCostEntries();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:3001/costentries/${id}`);
        fetchCostEntries(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting cost entry:', error);
      }
    }
  };

  const columns = [
    { name: "ID", selector: (row: CostEntry) => row.id, sortable: true, width: '70px' },
    { name: "금액", selector: (row: CostEntry) => row.amount, sortable: true, format: (row: CostEntry) => `$${row.amount}` },
    { name: "날짜", selector: (row: CostEntry) => new Date(row.date).toLocaleDateString(), sortable: true },
    { name: "설명", selector: (row: CostEntry) => row.description || '', sortable: true },
    { name: "태스크 ID", selector: (row: CostEntry) => row.taskId, sortable: true },
    { name: "사용자 ID", selector: (row: CostEntry) => row.userId, sortable: true },
    {
      name: "작업",
      button: true,
      cell: (row: CostEntry) => (
        <>
          <IconButton onClick={() => navigate(`/costentries/${row.id}/edit`)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cost Entries
      </Typography>
      <Button component={Link} to="/costentries/new" variant="contained" sx={{ mb: 2 }}>
        Create New Cost Entry
      </Button>
      <Box sx={{ width: '100%', mt: 2 }}>
        <DataTable
          columns={columns}
          data={costEntries}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
        />
      </Box>
    </Box>
  );
};

export default CostEntryPage;
