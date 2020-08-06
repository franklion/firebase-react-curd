import React, { useCallback } from 'react';
import { generateRandomMoney, generateRandomAge } from '../helpers';
import cons from '../constants';
import base from '../base';
import moment from 'moment';

// ant design
import { Button, message } from 'antd';

const MEMBERS = cons.NAMES.map(name => ({
  name,
  age: generateRandomAge(),
  money: generateRandomMoney(),
  updateTime: moment().valueOf()
}));

const rootRef = base.database().ref();

const MakeFakeData = () => {
  const makeFakeData = useCallback(() => {
    new Promise((resolve, reject) => {
      MEMBERS.forEach(item => {
        rootRef.push(item, function (error) {
          error ? reject() : resolve();
        });
      });
    })
      .then(() => {
        message.success(cons.MAKE_FAKE_DATA_SUCCESS);
      })
      .catch(err => {
        message.error(cons.MAKE_FAKE_DATA_FAIL);
      });
  }, []);

  return (
    <Button type="primary" className="btn" onClick={makeFakeData}>
      產生假資料
    </Button>
  );
};

export default MakeFakeData;
