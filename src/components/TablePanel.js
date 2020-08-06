import React from 'react';
import cons from '../constants';
import { Table } from 'antd';
import moment from 'moment';

const TablePanel = ({ list, pagination, loading, onTableChange, deleteItem, updateItem }) => {
  const TABLE_COLUMNS = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '年齡',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
    },
    {
      title: '金額',
      dataIndex: 'money',
      key: 'money',
      align: 'center'
    },
    {
      title: '更新時間',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align: 'center',
      render: (text, record) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="table-action-panel">
            <span className="btn-update" data-record={JSON.stringify(record)} onClick={updateItem}>
              更新
            </span>
            <span className="btn-delete" data-id={record.id} onClick={deleteItem}>
              刪除
            </span>
          </div>
        );
      }
    }
  ];
  return (
    <Table
      bordered
      rowKey="id"
      scroll={cons.TABLE_SCROLL}
      columns={TABLE_COLUMNS}
      dataSource={list}
      loading={loading}
      pagination={{ ...pagination }}
      onChange={onTableChange}
    />
  );
};

export default TablePanel;
