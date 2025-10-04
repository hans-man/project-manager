import React, { useState } from 'react';
import ListInstanceCode from './components/instance-codes/ListInstanceCode';
import SaveInstanceCode from './components/instance-codes/SaveInstanceCode';
import InstanceCodeBulkUpload from './components/instance-codes/InstanceCodeBulkUpload';
import { Box, Typography } from '@mui/material';

interface InstanceCode {
  instanceIdentifier: string;
  instanceIdentifierName: string;
  instanceCode: string;
  instanceCodeName: string;
  queryOrder: number;
  description?: string;
}

interface InstanceCodePageProps {
  token: string;
}

const InstanceCodePage: React.FC<InstanceCodePageProps> = ({ token }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedInstanceCode, setSelectedInstanceCode] = useState<InstanceCode | undefined>(undefined);
  const [refreshList, setRefreshList] = useState(false);

  const handleAdd = () => {
    setSelectedInstanceCode(undefined);
    setShowForm(true);
  };

  const handleEdit = (instanceCode: InstanceCode) => {
    setSelectedInstanceCode(instanceCode);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedInstanceCode(undefined);
    setRefreshList(prev => !prev); // Trigger list refresh
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedInstanceCode(undefined);
  };

  const handleBulkUploadSuccess = () => {
    setRefreshList(prev => !prev); // Trigger list refresh after bulk upload
  };



  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Code List
      </Typography>
      {showForm ? (
        <SaveInstanceCode
          instanceCode={selectedInstanceCode}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          token={token}
        />
      ) : (
        <Box>
          <ListInstanceCode
            onEdit={handleEdit}
            onAdd={handleAdd}
            refreshList={refreshList} // Pass refresh prop
            token={token}
          />
          <InstanceCodeBulkUpload onUploadSuccess={handleBulkUploadSuccess} token={token} />
        </Box>
      )}
    </Box>
  );
};

export default InstanceCodePage;
