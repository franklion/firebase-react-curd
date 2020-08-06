import React, { useCallback, memo } from 'react';
import PopupModal from './PopupModal';
import cons from '../constants';
import base from '../base';
import { message } from 'antd';

const rootRef = base.database().ref();

const CreateMembersContainer = ({ isShow, hideCreateModal }) => {
  const updateData = useCallback(
    record => {
      console.log('updateData', record);
      rootRef.push(record, function (error) {
        if (error) {
          message.error(cons.CREATE_DATA_FAIL);
        } else {
          message.success(cons.CREATE_DATA_SCUUESS);
        }
      });
      hideCreateModal();
    },
    [hideCreateModal]
  );

  return (
    <PopupModal
      isShow={isShow}
      title={cons.CREATE_POPUP_MODAL_TITLE}
      hideModal={hideCreateModal}
      onSubmit={updateData}
    />
  );
};

export default memo(CreateMembersContainer);
