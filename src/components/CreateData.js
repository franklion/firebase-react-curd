import React, { memo } from 'react';
import { Button } from 'antd';

const CreateData = ({ createDate }) => {
  return (
    <Button type="primary" className="btn" onClick={createDate}>
      新增資料
    </Button>
  );
};

export default memo(CreateData);
