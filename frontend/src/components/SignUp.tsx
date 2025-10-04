import React, { useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import { Form, Input, Button, Typography, Alert, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const SignUp = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await api.post('/users', values);
      alert('회원가입을 축하합니다.');
      navigate('/login');
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(`오류: ${error.response.data.message}`);
      } else {
        setMessage('예기치 않은 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>회원가입</Title>
          <Form name="register" onFinish={onFinish} scrollToFirstError>
            <Form.Item
              name="name"
              rules={[{ required: true, message: '이름을 입력해주세요.', whitespace: true }]}
            >
              <Input prefix={<UserOutlined />} placeholder="이름" />
            </Form.Item>
            <Form.Item
              name="loginId"
              rules={[{ required: true, message: '로그인 ID를 입력해주세요.' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="로그인 ID (8자 이상)" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { type: 'email', message: '유효한 이메일이 아닙니다.' },
                { required: true, message: '이메일을 입력해주세요.' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="이메일 주소" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="비밀번호" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: '비밀번호를 확인해주세요.' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="비밀번호 확인" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                회원가입
              </Button>
            </Form.Item>
            {message && (
              <Alert message={message} type="error" showIcon />
            )}
            <div style={{ textAlign: 'center' }}>
              이미 계정이 있으신가요? <Link to="/login">로그인</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;
