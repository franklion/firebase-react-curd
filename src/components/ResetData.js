import React from 'react';
import { Button } from 'antd';

const ResetData = ({ resetData }) => {
  return (
    <Button type="primary" className="btn" onClick={resetData}>
      重置資料
    </Button>
  );
};

export default ResetData;
