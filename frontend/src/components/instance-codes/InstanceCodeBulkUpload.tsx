import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Alert,
  LinearProgress,
  Link as MuiLink,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface InstanceCodeBulkUploadProps {
  token: string;
  onUploadSuccess: () => void;
}

const InstanceCodeBulkUpload: React.FC<InstanceCodeBulkUploadProps> = ({
  token,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadResults, setUploadResults] = useState<any | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadError(null);
      setUploadSuccess(null);
      setUploadResults(null);
    }
  };

  const handleUpload = async (token: string) => {
    if (!selectedFile) {
      setUploadError('업로드할 파일을 선택하십시오.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);
    setUploadResults(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        '/instance-codes/bulk-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUploadSuccess('파일이 성공적으로 업로드되었습니다.');
      setUploadResults(response.data);
      onUploadSuccess();
    } catch (error: any) {
      setUploadError(
        error.response?.data?.message ||
          '파일 업로드 중 오류가 발생했습니다.' + error.message
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = async (token: string) => {
    try {
      const response = await axios.get(
        '/instance-codes/template',
        {
          responseType: 'blob', // Important for downloading files
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'instance_code_template.xlsx'); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      setUploadError(
        error.response?.data?.message ||
          '템플릿 다운로드 중 오류가 발생했습니다.' + error.message
      );
    }
  };

  return (
    <Box sx={{ mt: 4, p: 3, border: '1px dashed grey', borderRadius: '4px' }}>
      <Typography variant="h6" gutterBottom>
        Bulk Register Instance Codes with Excel File
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Upload an Excel file containing instance code data to register multiple items at once.
        <MuiLink component="button" onClick={() => handleDownloadTemplate(token)} sx={{ ml: 1 }}>
          Download Template
        </MuiLink>
      </Typography>

      <input
        type="file"
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        id="bulk-upload-file-input"
        onChange={handleFileChange}
      />
      <label htmlFor="bulk-upload-file-input">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          disabled={uploading}
        >
          {selectedFile ? selectedFile.name : 'Select File'}
        </Button>
      </label>
      <Button
        variant="contained"
        onClick={() => handleUpload(token)}
        disabled={!selectedFile || uploading}
        sx={{ ml: 2 }}
      >
        Upload
      </Button>

      {uploading && <LinearProgress sx={{ mt: 2 }} />}
      {uploadError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {uploadError}
        </Alert>
      )}
      {uploadSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {uploadSuccess}
          {uploadResults && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">Success: {uploadResults.success.length} items</Typography>
              <Typography variant="body2">Failed: {uploadResults.failed.length} items</Typography>
              {uploadResults.failed.length > 0 && (
                <Typography variant="body2" color="error">
                  Failed Details: {JSON.stringify(uploadResults.failed, null, 2)}
                </Typography>
              )}
            </Box>
          )}
        </Alert>
      )}
    </Box>
  );
};

export default InstanceCodeBulkUpload;
