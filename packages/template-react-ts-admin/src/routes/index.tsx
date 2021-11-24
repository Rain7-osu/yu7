import React, { useCallback } from 'react';
import { BrowserRouter, Switch, Route, Link, useLocation } from 'react-router-dom';
import { Button, Menu } from 'antd';
import { AuthContainer } from '@src/routes/AuthContainer';
import { ErrorBoundary } from '@src/routes/ErrorBoundary';
import { clearAccessToken } from '@src/api/token';
import { Info } from '@src/pages/Info';
import { User } from '@src/pages/User';

export const LeftMenu = () => {
  const handleLogout = useCallback(() => {
    clearAccessToken();
    window.location.reload();
  }, []);

  const { pathname } = useLocation() || {};

  return (
    <Menu
      mode="inline"
      theme="dark"
      style={{ height: '100vh' }}
      activeKey={pathname || '/users'}
    >
      <Menu.Item key="/users">
        <Link to="/users">
          <Button type="text" style={{ color: '#fff' }}>用户列表</Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="/infos">
        <Button type="text" style={{ color: '#fff' }}>信息列表</Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" danger onClick={handleLogout}>注销</Button>
      </Menu.Item>
    </Menu>
  );
};

export const Routes = () => {

  return (
    <BrowserRouter>
      <div className="page-container">
        <div className="menu">
          <LeftMenu />
        </div>
        <div className="page">
          <ErrorBoundary>
            <AuthContainer>
              <Switch>
                <Route path="/users" component={User}/>
                <Route path="/infos" component={Info}/>
              </Switch>
            </AuthContainer>
          </ErrorBoundary>
        </div>
      </div>
    </BrowserRouter>
  );
};
