import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Alert } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

interface User {
  id: number;
  name: string;
  loginId: string;
  email: string;
  departmentCode?: string;
  positionCode?: string;
  roleCode?: string;
  userTypeCode?: string;
  hireDate?: string;
  resignationDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserListProps {
  token: string;
}

const UserList: React.FC<UserListProps> = ({ token }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`사용자를 가져오지 못했습니다: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('사용자를 가져오는 중 예기치 않은 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    form.setFieldsValue({
      ...user,
      hireDate: user.hireDate ? moment(user.hireDate) : null,
      resignationDate: user.resignationDate ? moment(user.resignationDate) : null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSave = async (values: any) => {
    try {
      await axios.put(`/users/${selectedUser!.id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalOpen(false);
      fetchUsers(); // Refresh the user list
    } catch (err: any) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        let errorMessage = err.response.data.message || err.response.statusText;
        if (Array.isArray(errorMessage)) {
          errorMessage = errorMessage.join(', ');
        }
        setError(`사용자를 업데이트하지 못했습니다: ${errorMessage}`);
      } else {
        setError('사용자 업데이트 중 예기치 않은 오류가 발생했습니다.');
      }
    }
  };

  const columns = [
    { title: '로그인 ID', dataIndex: 'loginId', key: 'loginId', sorter: (a: User, b: User) => a.loginId.localeCompare(b.loginId) },
    { title: '이름', dataIndex: 'name', key: 'name', sorter: (a: User, b: User) => a.name.localeCompare(b.name) },
    { title: '이메일', dataIndex: 'email', key: 'email' },
    { title: '사용자유형', dataIndex: 'userTypeCode', key: 'userTypeCode', render: (code: string) => code === '1' ? 'Administrator' : 'General User' },
    { title: '생성일', dataIndex: 'createdAt', key: 'createdAt', render: (date: string) => new Date(date).toLocaleDateString() },
    {
      title: '작업',
      key: 'action',
      render: (_: any, record: User) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </>
      ),
    },
  ];

  return (
    <>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Table columns={columns} dataSource={users} loading={loading} rowKey="id" />
      <Modal
        title="Edit User"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="이름"><Input disabled /></Form.Item>
          <Form.Item name="email" label="이메일"><Input disabled /></Form.Item>
          <Form.Item name="loginId" label="로그인 ID"><Input disabled /></Form.Item>
          <Form.Item name="departmentCode" label="부서 코드"><Input /></Form.Item>
          <Form.Item name="positionCode" label="직위 코드"><Input /></Form.Item>
          <Form.Item name="roleCode" label="역할 코드"><Input /></Form.Item>
          <Form.Item name="userTypeCode" label="사용자 유형">
            <Select>
              <Option value="1">Administrator</Option>
              <Option value="2">General User</Option>
            </Select>
          </Form.Item>
          <Form.Item name="hireDate" label="입사일"><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="resignationDate" label="퇴사일"><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginLeft: 8 }}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserList;
