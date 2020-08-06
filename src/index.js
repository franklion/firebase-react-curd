import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Layout } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-tw';
import moment from 'moment-timezone';
import './styles/index.scss';
import App from './components/App.js';

const { Content } = Layout;

moment.tz.setDefault('Asia/Taipei');

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Content className="content-layout">
      <App />
    </Content>
  </ConfigProvider>,

  document.getElementById('root')
);
