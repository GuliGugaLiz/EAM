import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import Moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon,
   Button, Dropdown, Menu, InputNumber, Switch,
    DatePicker, Modal, message, Badge, Divider,List } from 'antd';

import styles from './AssetEdit.less';
const { TextArea } = Input;

const FormItem = Form.Item;
@Form.create()
export default class AssetEdit extends PureComponent{
  state = {
  }

  render() {
    const {data, record, modalVisible, form, handleEdit, handleModalVisible } = this.props;
    //console.log(record)
    const { getFieldDecorator, getFieldValue } = form;
    const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      this.props.handleEdit(record.key,fieldsValue);
    });
  };
  

   const formItemLayout = {
    labelCol: {
      xs: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 14 },
    },
  };
  return (
    <Modal width="85%"
      title="编辑资产"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => this.props.handleEditModalVisible()}
    >
    
    <List 
    grid={{ gutter: 16, column: 4 }}
    
    dataSource={data}
    renderItem={item => (     
      <List.Item  style={{marginBottom:0}}>
      <FormItem
        {...formItemLayout}
        label={item.title}
      >
        {getFieldDecorator(item.dataIndex, {          
          initialValue: item.type==='date' ? Moment(item.value) : item.value
        })(
          item.type==='date' ? <DatePicker /> : <Input placeholder={item.title} />
        )
      }
      </FormItem>
        
      </List.Item> 
    )}
  />        
    </Modal>
  );
  }
}
