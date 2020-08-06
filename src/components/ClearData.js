import React, { useCallback, memo } from 'react';
import cons from '../constants';
import { Button, message } from 'antd';
import base from '../base';

const rootRef = base.database().ref();

const ClearData = () => {
  const clearData = useCallback(() => {
    rootRef.set(null, function (error) {
      if (error) {
        message.error(cons.CLEAR_DATA_FAIL);
      } else {
        message.success(cons.CLEAR_DATA_SUCCESS);
      }
    });
  }, []);

  return (
    <Button type="primary" className="btn" onClick={clearData}>
      清除所有資料
    </Button>
  );
};

export default memo(ClearData);
