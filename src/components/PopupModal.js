import React, { useMemo, useCallback, memo, useEffect } from 'react';
import { encodeFormParameters } from '../helpers';
import { Modal, Button, Form, Input } from 'antd';
import cons from '../constants';

const PopupModal = ({ form, record, title, isShow, hideModal, onSubmit }) => {
  const { getFieldDecorator, validateFieldsAndScroll, resetFields } = useMemo(() => form, [form]);

  useEffect(() => {
    resetFields();
  }, [isShow, resetFields]);

  const handleOk = useCallback(() => {
    validateFieldsAndScroll((err, formData) => {
      if (!err) {
        const recordId = record && record.id;
        const filteredFormData = encodeFormParameters({ ...formData, id: recordId });
        onSubmit(filteredFormData);
      }
    });
  }, [validateFieldsAndScroll, onSubmit, record]);

  return (
    <Modal
      title={title}
      visible={isShow}
      onOk={handleOk}
      onCancel={hideModal}
      className="app-popup-modal"
      footer={
        <div className="popup-modal-footer">
          <Button key="back" onClick={hideModal}>
            取消
          </Button>
          <Button key="submit" type="primary" onClick={handleOk}>
            確定
          </Button>
        </div>
      }>
      <Form layout="horizontal" className="popup-modal-panel">
        <Form.Item {...cons.FORM_ITEM_LAYOUT} label="姓名" className="form-item">
          {getFieldDecorator('name', {
            initialValue: record && record.name,
            rules: [
              {
                required: true,
                message: '姓名不可為空白!'
              },
              { pattern: /^[a-zA-Z]{1,35}$/, message: '请您输入英文字' }
            ]
          })(<Input maxLength={35} className="input-name" placeholder="请输入姓名" />)}
        </Form.Item>

        <Form.Item {...cons.FORM_ITEM_LAYOUT} label="年齡" className="form-item">
          {getFieldDecorator('age', {
            initialValue: record && record.age,
            rules: [
              {
                required: true,
                message: '年齡不可為空白!'
              },
              { pattern: /^\d+$/g, message: '请您输入數字' }
            ]
          })(<Input maxLength={2} className="input-age" placeholder="请输入年齡" />)}
        </Form.Item>

        <Form.Item {...cons.FORM_ITEM_LAYOUT} label="收入" className="form-item">
          {getFieldDecorator('money', {
            initialValue: record && record.money,
            rules: [
              {
                required: true,
                message: '收入不可為空白!'
              },
              { pattern: /^\d+$/g, message: '请您输入數字' }
            ]
          })(<Input maxLength={20} className="input-money" placeholder="请输入收入" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(Form.create()(PopupModal));
