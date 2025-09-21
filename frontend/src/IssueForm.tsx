import React, { useState } from 'react';
import axios from 'axios';

const IssueForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/issues', { title, description });
      setMessage('이슈가 성공적으로 등록되었습니다!');
      setTitle('');
      setDescription('');
    } catch (error) {
      setMessage('이슈 등록에 실패했습니다.');
      console.error('이슈 등록 오류:', error);
    }
  };

  return (
    <div>
      <h2>새 이슈 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">설명:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">이슈 등록</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default IssueForm;
