import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Form, Input, Button, Typography, Card, DatePicker, Row, Col, Alert, InputNumber } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const { Title } = Typography;

const SaveProgram: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');
  const [columnNames, setColumnNames] = useState<any[]>([]);

  useEffect(() => {
    const fetchColumnNames = async () => {
      try {
        const response = await api.get('/program-column-name', { params: { projectId: 1 } });
        setColumnNames(response.data);
      } catch (error) {
        console.error('Error fetching column names:', error);
      }
    };
    fetchColumnNames();

    if (id) {
      const fetchProgram = async () => {
        try {
          const response = await api.get(`/program-list/${id}`);
          const programData = response.data;
          // Convert date strings to moment objects
          for (let i = 51; i <= 55; i++) {
            const key = `column${i}`;
            if (programData[key]) {
              programData[key] = moment(programData[key]);
            }
          }
          form.setFieldsValue(programData);
        } catch (error) {
          console.error('Error fetching program:', error);
        }
      };
      fetchProgram();
    }
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      if (id) {
        await api.patch(`/program-list/${id}`, values);
      } else {
        await api.post('/program-list', values);
      }
      navigate('/program-list');
    } catch (error) {
      setMessage('Failed to save program.');
      console.error('Error saving program:', error);
    }
  };

  const getColumnLabel = (columnId: string) => {
    const column = columnNames.find(c => c.columnId === columnId);
    return column ? column.columnName : columnId;
  };

  const renderField = (columnId: string, type: string = 'text') => {
    const label = getColumnLabel(columnId);

    if (type === 'date') {
      return (
        <Col span={12} key={columnId}>
          <Form.Item name={columnId} label={label}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      );
    } else if (type === 'number') {
      return (
        <Col span={12} key={columnId}>
          <Form.Item name={columnId} label={label}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      );
    } else {
      return (
        <Col span={12} key={columnId}>
          <Form.Item name={columnId} label={label}>
            <Input />
          </Form.Item>
        </Col>
      );
    }
  };

  return (
    <Card>
      <Title level={3}>{id ? 'Edit Program' : 'Create New Program'}</Title>
      {message && <Alert message={message} type="error" showIcon style={{ marginBottom: '24px' }}/>}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          {Array.from({ length: 50 }, (_, i) => renderField(`column${i + 1}`))}
          {Array.from({ length: 5 }, (_, i) => renderField(`column${i + 51}`, 'date'))}
          {Array.from({ length: 5 }, (_, i) => renderField(`column${i + 56}`, 'number'))}
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => navigate('/program-list')} style={{ marginLeft: '8px' }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SaveProgram;
