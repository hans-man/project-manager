import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // DatePicker 임포트

const IssueForm: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  // 새롭게 추가되는 필드들에 대한 state (날짜 필드는 Date | null 타입으로 변경)
  const [taskName, setTaskName] = useState('');
  const [testClassification, setTestClassification] = useState('');
  const [testRound, setTestRound] = useState<number | null>(null); // 초기값 null, 타입 변경
  const [programId, setProgramId] = useState('');
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [assigneeName, setAssigneeName] = useState('');
  const [developmentDueDate, setDevelopmentDueDate] = useState<Date | null>(null); // Date | null 타입
  const [developmentCompletionDate, setDevelopmentCompletionDate] = useState<Date | null>(null); // Date | null 타입
  const [status, setStatus] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerReviewCompletionDate, setManagerReviewCompletionDate] = useState<Date | null>(null); // Date | null 타입
  const [businessOwnerName, setBusinessOwnerName] = useState('');
  const [businessOwnerReviewCompletionDate, setBusinessOwnerReviewCompletionDate] = useState<Date | null>(null); // Date | null 타입


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (projectId === null) {
      setMessage('프로젝트 ID를 입력해주세요.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/issues', {
        title,
        description,
        projectId,
        taskName,
        testClassification,
        testRound,
        programId,
        programName,
        programDescription,
        assigneeName,
        developmentDueDate, // Date 객체 그대로 전송 (axios가 알아서 ISO 문자열로 변환)
        developmentCompletionDate,
        status,
        managerName,
        managerReviewCompletionDate,
        businessOwnerName,
        businessOwnerReviewCompletionDate,
      });
      setMessage('이슈가 성공적으로 등록되었습니다!');
      // Reset form
      setTitle('');
      setDescription('');
      setProjectId(null);
      setTaskName('');
      setTestClassification('');
      setTestRound(null);
      setProgramId('');
      setProgramName('');
      setProgramDescription('');
      setAssigneeName('');
      setDevelopmentDueDate(null);
      setDevelopmentCompletionDate(null);
      setStatus('');
      setManagerName('');
      setManagerReviewCompletionDate(null);
      setBusinessOwnerName('');
      setBusinessOwnerReviewCompletionDate(null);
      navigate('/issues');

    } catch (error) {
      setMessage('이슈 등록에 실패했습니다.');
      console.error('이슈 등록 오류:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        새 이슈 등록
      </Typography>

      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="설명"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="프로젝트 ID"
        variant="outlined"
        fullWidth
        type="number"
        value={projectId === null ? '' : projectId}
        onChange={(e) => setProjectId(e.target.value === '' ? null : parseInt(e.target.value))}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        label="업무명"
        variant="outlined"
        fullWidth
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="테스트구분"
        variant="outlined"
        fullWidth
        value={testClassification}
        onChange={(e) => setTestClassification(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="테스트회차"
        variant="outlined"
        fullWidth
        type="number"
        value={testRound === null ? '' : testRound}
        onChange={(e) => setTestRound(e.target.value === '' ? null : parseInt(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        label="프로그램ID"
        variant="outlined"
        fullWidth
        value={programId}
        onChange={(e) => setProgramId(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="프로그램명"
        variant="outlined"
        fullWidth
        value={programName}
        onChange={(e) => setProgramName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="프로그램설명"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={programDescription}
        onChange={(e) => setProgramDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="담당자명"
        variant="outlined"
        fullWidth
        value={assigneeName}
        onChange={(e) => setAssigneeName(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* DatePicker 컴포넌트로 교체 */}
      <DatePicker
        label="개발예정일"
        value={developmentDueDate}
        onChange={(newValue: Date | null) => {
          setDevelopmentDueDate(newValue);
        }}
        slots={{ textField: TextField }}
        slotProps={{ textField: { fullWidth: true, variant: "outlined", sx: { mb: 2 } } }}
      />
      <DatePicker
        label="개발완료일"
        value={developmentCompletionDate}
        onChange={(newValue: Date | null) => {
          setDevelopmentCompletionDate(newValue);
        }}
        slots={{ textField: TextField }}
        slotProps={{ textField: { fullWidth: true, variant: "outlined", sx: { mb: 2 } } }}
      />

      <TextField
        label="상태"
        variant="outlined"
        fullWidth
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="관리자명"
        variant="outlined"
        fullWidth
        value={managerName}
        onChange={(e) => setManagerName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DatePicker
        label="관리자검토완료일"
        value={managerReviewCompletionDate}
        onChange={(newValue: Date | null) => {
          setManagerReviewCompletionDate(newValue);
        }}
        slots={{ textField: TextField }}
        slotProps={{ textField: { fullWidth: true, variant: "outlined", sx: { mb: 2 } } }}
      />
      <TextField
        label="현업담당자명"
        variant="outlined"
        fullWidth
        value={businessOwnerName}
        onChange={(e) => setBusinessOwnerName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DatePicker
        label="현업검토완료일"
        value={businessOwnerReviewCompletionDate}
        onChange={(newValue: Date | null) => {
          setBusinessOwnerReviewCompletionDate(newValue);
        }}
        slots={{ textField: TextField }}
        slotProps={{ textField: { fullWidth: true, variant: "outlined", sx: { mb: 2 } } }}
      />

      <Button type="submit" variant="contained" color="primary">
        이슈 등록
      </Button>
      {message && <Typography color="textSecondary" sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default IssueForm;