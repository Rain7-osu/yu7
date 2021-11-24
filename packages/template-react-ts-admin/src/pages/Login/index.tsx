import React, { useCallback } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LoginContainer } from './styles';
import { fetchLogin } from '@src/api/fetchLogin';

export const Login = () => {
  const handleFinish = useCallback(async (values) => {
    try {
      await fetchLogin(values);
      window.location.reload();
    } catch (e: any) {
      if (e.type === 403) {
        message.error({
          content: '对不起，您没有权限！',
        });
      }
    }
  }, []);

  return (
    <LoginContainer>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入你的用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};
