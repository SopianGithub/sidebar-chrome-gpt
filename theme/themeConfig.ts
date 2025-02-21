// theme/themeConfig.ts
import { theme as antdTheme, type ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#007bff', // Primary blue color
    colorSuccess: '#28a745', // Success green color
    colorError: '#dc3545', // Error red color
    colorWarning: '#ffc107', // Warning yellow color
    colorInfo: '#17a2b8', // Info cyan color
    colorText: '#343a40', // Dark text color
    colorTextSecondary: '#6c757d', // Secondary text color
  },
  algorithm: antdTheme.darkAlgorithm
};

export default theme;