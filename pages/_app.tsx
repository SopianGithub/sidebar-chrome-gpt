// pages/_app.js
import '../src/styles/globals.css';
import '../src/styles/extension.css';
import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import theme from '../theme/themeConfig';
import { AuthProvider } from '../components/Auth';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <AuthProvider> 
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  </AuthProvider>
);

export default MyApp;
