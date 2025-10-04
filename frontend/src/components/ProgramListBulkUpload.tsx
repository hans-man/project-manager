// TEMP COMMENT
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

interface ProgramListBulkUploadProps {
  token: string;
  onUploadSuccess: () => void;
}

const ProgramListBulkUpload: React.FC<ProgramListBulkUploadProps> = ({
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
    const authString = 'Bearer ' + token;
    const authHeader = { Authorization: authString };

    try {
      const response = await axios.post(
        'http://localhost:3001/api/program-list/bulk-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-form-data',
            ...authHeader,
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
    const authString = 'Bearer ' + token;
    const authHeader = { Authorization: authString };
    try {
      const response = await axios.get(
        'http://localhost:3001/api/program-list/template',
        {
          responseType: 'blob', // Important for downloading files
          headers: {
            ...authHeader,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'program_list_template.xlsx'); // Set the file name
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
        Excel 파일로 프로그램 목록 대량 등록
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        프로그램 목록 데이터를 포함하는 Excel 파일을 업로드하여 여러 항목을 한 번에 등록하십시오.
        <MuiLink component="button" onClick={() => handleDownloadTemplate(token)} sx={{ ml: 1 }}>
          템플릿 다운로드
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
          {selectedFile ? selectedFile.name : '파일 선택'}
        </Button>
      </label>
      <Button
        variant="contained"
        onClick={() => handleUpload(token)}
        disabled={!selectedFile || uploading}
        sx={{ ml: 2 }}
      >
        업로드
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
              <Typography variant="body2">성공: {uploadResults.success.length} 항목</Typography>
              <Typography variant="body2">실패: {uploadResults.failed.length} 항목</Typography>
              {uploadResults.failed.length > 0 && (
                <Typography variant="body2" color="error">
                  실패 세부 정보: {JSON.stringify(uploadResults.failed, null, 2)}
                </Typography>
              )}
            </Box>
          )}
        </Alert>
      )}
    </Box>
  );
};

export default ProgramListBulkUpload;
