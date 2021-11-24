import React from 'react';
import { message, Result } from 'antd';

interface PropsInterface {
  children: React.ReactNode
}

interface StateInterface{
  hasError: boolean
}

export class ErrorBoundary extends React.Component<PropsInterface, StateInterface>{
  state = {
    hasError: false,
  }

  componentDidCatch (error: Error) {
    this.setState({ hasError: true });
    message.error({
      content: String(error),
    });
  }

  render () {
    if(this.state.hasError) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="出错啦！"
        />
      );
    }

    return this.props['children'];
  }
}
