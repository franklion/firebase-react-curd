import React, { useCallback, useState } from 'react';
import MakeFakeData from './MakeFakeData';
import ResetData from './ResetData';
import ClearData from './ClearData';
import CreateData from './CreateData';
import TablePenal from './TablePanel';
import UpdateMembersContainer from './UpdateMembersContainer';
import CreateMembersContainer from './CreateMembersContainer';
import { useFetchList } from '../hooks';
import cons from '../constants';
import base from '../base';

// ant design
import { Divider, message } from 'antd';

const rootRef = base.database().ref();

function App() {
  const [isLoading, list, pageInfo, onTableChange, reset] = useFetchList(cons.FETCH_LIST_CONFIG);
  const [isTriggerCreate, setIsTriggerCreate] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleTableChange = useCallback(
    tableInfo => {
      onTableChange(tableInfo);
    },
    [onTableChange]
  );

  const handleReset = useCallback(() => {
    reset({
      ...cons.FETCH_LIST_CONFIG
    });
  }, [reset]);

  const handleDelete = useCallback(e => {
    const id = e.target.dataset.id;
    const memberRef = rootRef.child(`${id}`);
    memberRef.set(null, function (error) {
      if (error) {
        message.error(cons.DELETE_ITEM_FAIL);
      } else {
        message.success(cons.DELETE_ITEM_SUCCESS);
      }
    });
  }, []);

  const handleUpdate = useCallback(
    e => {
      const record = e.target.dataset.record;
      setCurrentRecord(JSON.parse(record));
    },
    [setCurrentRecord]
  );

  const handleClearRecord = useCallback(() => {
    setCurrentRecord(null);
  }, [setCurrentRecord]);

  const handleToggleCreateModal = useCallback(() => {
    setIsTriggerCreate(prevIsShow => !prevIsShow);
  }, []);

  return (
    <div className="page">
      <div className="action-row">
        <MakeFakeData />
        <ResetData resetData={handleReset} />
        <ClearData />
        <CreateData createDate={handleToggleCreateModal} />
      </div>

      <Divider />

      <TablePenal
        list={list}
        pagination={{
          ...pageInfo,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => {
            return `共 ${total} 筆資料 第 ${pageInfo.current} / ${Math.ceil(total / pageInfo.pageSize)} 頁`;
          }
        }}
        loading={isLoading}
        deleteItem={handleDelete}
        updateItem={handleUpdate}
        onTableChange={handleTableChange}
      />

      <UpdateMembersContainer currentRecord={currentRecord} clearRecord={handleClearRecord} />

      <CreateMembersContainer isShow={isTriggerCreate} hideCreateModal={handleToggleCreateModal} />
    </div>
  );
}

export default App;
