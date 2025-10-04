import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
} from '@mui/material';

interface InstanceCode {
  instanceIdentifier: string;
  instanceIdentifierName: string;
  instanceCode: string;
  instanceCodeName: string;
  queryOrder?: number;
  description?: string;
}

interface InstanceCodeFormProps {
  instanceCode?: InstanceCode;
  onSuccess: () => void;
  onCancel: () => void;
  token: string;
}

const InstanceCodeForm: React.FC<InstanceCodeFormProps> = ({
  instanceCode: initialInstanceCode,
  onSuccess,
  onCancel,
  token,
}) => {
  const [instanceCode, setInstanceCode] = useState<InstanceCode>(initialInstanceCode || {
    instanceIdentifier: '',
    instanceIdentifierName: '',
    instanceCode: '',
    instanceCodeName: '',
    queryOrder: 0,
    description: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    instanceIdentifier?: string;
    instanceIdentifierName?: string;
    instanceCode?: string;
    instanceCodeName?: string;
  }>({});

  useEffect(() => {
    if (initialInstanceCode) {
      setInstanceCode(initialInstanceCode);
    }
  }, [initialInstanceCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInstanceCode((prev) => ({
      ...prev,
      [name]: name === 'queryOrder' ? Number(value) : value,
    }));
    // Clear validation error for the changed field
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const errors: typeof validationErrors = {};
    if (!instanceCode.instanceIdentifier) {
      errors.instanceIdentifier = '인스턴스식별자는 필수 항목입니다.';
    }
    if (!instanceCode.instanceIdentifierName) {
      errors.instanceIdentifierName = '인스턴스식별자명은 필수 항목입니다.';
    }
    if (!instanceCode.instanceCode) {
      errors.instanceCode = '인스턴스코드는 필수 항목입니다.';
    }
    if (!instanceCode.instanceCodeName) {
      errors.instanceCodeName = '인스턴스코드명은 필수 항목입니다.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    const payload = {
      instanceIdentifier: instanceCode.instanceIdentifier,
      instanceIdentifierName: instanceCode.instanceIdentifierName,
      instanceCode: instanceCode.instanceCode,
      instanceCodeName: instanceCode.instanceCodeName,
      queryOrder: instanceCode.queryOrder,
      description: instanceCode.description,
    };

    try {
      if (initialInstanceCode) { // Check if it's an existing instance code based on initial data
        // Update existing instance code
        await axios.put(
          `/instance-codes/${instanceCode.instanceIdentifier}/${instanceCode.instanceCode}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new instance code
        await axios.post(
          '/instance-codes',
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      onSuccess();
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          `인스턴스 코드 저장 실패: ${err.response.data.message || err.response.statusText}`
        );
      } else {
        setError('인스턴스 코드 저장 중 예기치 않은 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={3} sx={{ p: 3, borderRadius: '8px' }}> {/* Added Card */}
        <CardContent>
          <Typography component="h1" variant="h5" gutterBottom sx={{ mb: 3 }}>
            {initialInstanceCode ? 'Edit Instance Code' : 'Register New Instance Code'}
          </Typography>
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}> {/* Replaced Grid container with Box */}
              <Box sx={{ width: { xs: '100%', sm: '50%' }, px: 1, mb: 2 }}> {/* Replaced Box with Grid-like styling */}
                <TextField
                  name="instanceIdentifier"
                  label="인스턴스 식별자"
                  value={instanceCode.instanceIdentifier}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!validationErrors.instanceIdentifier}
                  helperText={validationErrors.instanceIdentifier}
                  disabled={!!initialInstanceCode} // Disable if in edit mode
                />
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '50%' }, px: 1, mb: 2 }}> {/* Replaced Box with Grid-like styling */}
                <TextField
                  name="instanceIdentifierName"
                  label="인스턴스 식별자 이름"
                  value={instanceCode.instanceIdentifierName}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!validationErrors.instanceIdentifierName}
                  helperText={validationErrors.instanceIdentifierName}
                />
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '50%' }, px: 1, mb: 2 }}> {/* Replaced Box with Grid-like styling */}
                <TextField
                  name="instanceCode"
                  label="인스턴스 코드"
                  value={instanceCode.instanceCode}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!validationErrors.instanceCode}
                  helperText={validationErrors.instanceCode}
                  disabled={!!initialInstanceCode} // Disable if in edit mode
                />
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '50%' }, px: 1, mb: 2 }}> {/* Replaced Box with Grid-like styling */}
                <TextField
                  name="instanceCodeName"
                  label="인스턴스 코드 이름"
                  value={instanceCode.instanceCodeName}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!validationErrors.instanceCodeName}
                  helperText={validationErrors.instanceCodeName}
                />
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '50%' }, px: 1, mb: 2 }}> {/* Replaced Box with Grid-like styling */}
                <TextField
                  name="queryOrder"
                  label="조회 순서"
                  type="number"
                  value={instanceCode.queryOrder || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '50%' }, px: 1, mb: 2 }}> {/* Replaced Box with Grid-like styling */}
                <TextField
                  name="description"
                  label="설명"
                  value={instanceCode.description || ''}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button onClick={onCancel} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default InstanceCodeForm;
