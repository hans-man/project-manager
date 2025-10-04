import React, { useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import { Form, Input, Button, Typography, Checkbox, Alert, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Login = ({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) => {
  const [message, setMessage] = useState('');

  const onFinish = async (values: any) => {
    try {
      const response = await api.post('/auth/login', values);
      const token = response.data.access_token;
      setMessage(`로그인 성공! 토큰: ${token}`);
      onLoginSuccess(token);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(`오류: ${error.response.data.message || '잘못된 자격 증명'}`);
      } else {
        setMessage('예기치 않은 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)', backgroundSize: 'cover' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>로그인</Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="loginId"
              rules={[{ required: true, message: '로그인 ID를 입력해주세요.' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="로그인 ID" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="비밀번호" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>로그인 유지</Checkbox>
              </Form.Item>
              <Link to="#" style={{ float: 'right' }}>
                비밀번호를 잊으셨나요?
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                로그인
              </Button>
              또는 <Link to="/signup">회원가입</Link>
            </Form.Item>
            {message && (
              <Alert message={message} type={message.startsWith('오류') ? 'error' : 'success'} showIcon />
            )}
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;