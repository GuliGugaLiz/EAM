import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  Tabs, 
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane; 
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    confirmDirty:false
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
}
compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newpass')) {
        callback('两次密码不一致，请重新输入!');
    } else {
        callback();
    }
}
validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
        form.validateFields(['cnewpass'], { force: true });
    }
    callback();
}
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 2 },
      },
    };

    return (
   <PageHeaderLayout>
      <div className={styles.card}>
      <Tabs type="card">
        <TabPane tab="基本信息"  key="1">
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 2 }}
          >
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入用户名',
                }],
                initialValue: 'admin',
              })(
                <Input placeholder="test" disabled={true} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="昵称"
            >
              {getFieldDecorator('nickname', {
                rules: [{
                  required: true, message: '请输入昵称',
                }],
                initialValue: '陈小明',
              })(
                <Input />
              )}
            </FormItem>
 
 
            <FormItem
              {...formItemLayout}
              label="邮箱"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type:'email',message:'请输入正确格式'
                },{
                  required: true, message: '请输入邮箱',
                }],
                initialValue:"test@test.com",
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('memo', {
                rules: [{
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={4} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 16 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
              保存
              </Button>
            </FormItem>
          </Form>
        </TabPane>

        <TabPane tab="修改密码" key="2">
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 2 }}
          >
            <FormItem
              {...formItemLayout}
              label="旧密码"
            >
              {getFieldDecorator('oldpass', {
                rules: [{
                  required: true, message: '请输入旧密码',
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
            >
              {getFieldDecorator('newpass', {
                rules: [{
                  required: true, message: '请输入新密码',
                },{
                  validator:this.compareToNextPassword
                }],
              })(
                <Input  type="password"/>
              )}
            </FormItem>
 
            <FormItem
              {...formItemLayout}
              label="确认密码"
            >
              {getFieldDecorator('cnewpass', {
                rules: [{
                  required: true, message: '请输入确认密码',
                },{
                  validator: this.compareToFirstPassword
              }],
              })(
                <Input  type="password"
                onBlur = {this.handleConfirmBlur} />
              )}
            </FormItem>
 
            <FormItem {...submitFormLayout} style={{ marginTop: 16 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
              保存
              </Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
      </div>
    </PageHeaderLayout>
    );
  }
}
