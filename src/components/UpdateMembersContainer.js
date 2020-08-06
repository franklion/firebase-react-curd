import React, { useEffect, useState, useCallback, memo } from 'react';
import PopupModal from './PopupModal';
import cons from '../constants';
import base from '../base';
import { message } from 'antd';

const rootRef = base.database().ref();

const UpdateMembersContainer = ({ currentRecord, clearRecord }) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    currentRecord ? setIsShow(true) : setIsShow(false);
  }, [currentRecord]);

  const updateData = useCallback(
    record => {
      const { id, ...rest } = record;

      console.log('updateData', id, rest);

      rootRef.update(
        {
          [id]: rest
        },
        function (error) {
          if (error) {
            message.error(cons.UPDATE_DATA_FAIL);
          } else {
            message.success(cons.UPDATE_DATA_SCUUESS);
          }
        }
      );
      clearRecord();
    },
    [clearRecord]
  );

  return (
    <PopupModal
      isShow={isShow}
      title={cons.UPDATE_POPUP_MODAL_TITLE}
      record={currentRecord}
      hideModal={clearRecord}
      onSubmit={updateData}
    />
  );
};

export default memo(UpdateMembersContainer);
