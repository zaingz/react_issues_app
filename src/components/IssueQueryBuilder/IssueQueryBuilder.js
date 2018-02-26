import React, { Component } from 'react';
import { Select, DatePicker } from 'antd';
import { Form, Input, Button, Radio, Modal } from 'antd';
import './IssueQueryBuilder.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const FormItem = Form.Item;

const Option = Select.Option;

class CollectionCreateForm extends Component {
  state = {
    params: []
  };

  getInputFields = params => {
    const form = this.props.form;

    let fields = [];

    if (params.includes('milestone'))
      fields.push(
        <FormItem key="form-milestone" label={`Value for milestone`}>
          {form.getFieldDecorator('milestone', {
            rules: [
              { required: true, message: 'Please enter the parameter value' }
            ]
          })(<Input />)}
        </FormItem>
      );

    if (params.includes('state'))
      fields.push(
        <FormItem key="form-state" label={`Value for state`}>
          {form.getFieldDecorator('state', {
            initialValue: 'open',
            rules: [
              { required: true, message: 'Please enter the parameter value' }
            ]
          })(
            <Select>
              <Option value="open">Open</Option>
              <Option value="closed">Closed</Option>
              <Option value="all">All</Option>
            </Select>
          )}
        </FormItem>
      );

    if (params.includes('assignee'))
      fields.push(
        <FormItem key="form-assignee" label={`Value for assignee`}>
          {form.getFieldDecorator('assignee', {
            rules: [
              { required: true, message: 'Please enter the parameter value' }
            ]
          })(<Input />)}
        </FormItem>
      );

    if (params.includes('creator'))
      fields.push(
        <FormItem key="form-creator" label={`Value for creator`}>
          {form.getFieldDecorator('creator', {
            rules: [
              { required: true, message: 'Please enter the parameter value' }
            ]
          })(<Input />)}
        </FormItem>
      );

    if (params.includes('mentioned'))
      fields.push(
        <FormItem key="form-mentioned" label={`Value for mentioned`}>
          {form.getFieldDecorator('mentioned', {
            rules: [
              { required: true, message: 'Please enter the parameter value' }
            ]
          })(<Input />)}
        </FormItem>
      );

    if (params.includes('labels'))
      fields.push(
        <FormItem key="form-labels" label={`Value for labels`}>
          {form.getFieldDecorator('labels', {
            rules: [
              { required: true, message: 'Please enter the parameter value' }
            ]
          })(<Input placeholder="seprated by commas(,)" />)}
        </FormItem>
      );

    if (params.includes('sort'))
      fields.push(
        <FormItem key="form-sort" label={`Value for sort`}>
          {form.getFieldDecorator('sort', {
            initialValue: 'created',
            rules: [
              { required: true, message: 'Please enter the parameter value' }
            ]
          })(
            <Select>
              <Option value="created">Created</Option>
              <Option value="updated">Updated</Option>
              <Option value="comments">Comments</Option>
            </Select>
          )}
        </FormItem>
      );

    if (params.includes('since'))
      fields.push(
        <FormItem key="form-since" label={`Value for since`}>
          {form.getFieldDecorator('since', {
            rules: [
              { required: true, message: 'Please enter the parameter value' }
            ]
          })(
            <DatePicker
              format="YYYY-MM-DDTHH:MM:SSZ"
              placeholder="Select Time"
            />
          )}
        </FormItem>
      );

    return fields;
  };

  onParamChange = params => {
    this.setState({ params });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const inputFields = this.getInputFields(this.state.params);

    const paramsOptions = [
      <Option key="milestone" value="milestone">
        Milestone
      </Option>,
      <Option key="state" value="state">
        State
      </Option>,
      <Option key="assignee" value="assignee">
        Assignee
      </Option>,
      <Option key="creator" value="creator">
        Creator
      </Option>,
      <Option key="mentioned" value="mentioned">
        Mentioned
      </Option>,
      <Option key="labels" value="labels">
        Labels
      </Option>,
      <Option key="sort" value="sort">
        Sort
      </Option>,
      <Option key="since" value="since">
        Since
      </Option>
    ];
    return (
      <Modal
        visible={visible}
        title="Select a parameter to filter"
        okText="Add"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem label="Params">
            {getFieldDecorator('params', {
              rules: [
                {
                  required: true,
                  message: 'Please select the filter parameter!'
                }
              ]
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select filter parameter"
                onChange={this.onParamChange}
              >
                {paramsOptions}
              </Select>
            )}
          </FormItem>
          <div className="form-values">{inputFields}</div>
        </Form>
      </Modal>
    );
  }
}

class IssueQueryBuilder extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.onQueryCreated(this.createQuery(values));
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  saveFormRef = form => {
    this.form = form;
  };

  createQuery(values) {
    const params = Object.assign({}, values);
    delete params.params;

    let query = '';
    for (const key of Object.keys(params)) {
      query += `${key}=${params[key]}&`;
    }
    return query.slice(0, -1);
  }

  render() {
    const WrappedCollectionForm = Form.create()(CollectionCreateForm);

    return (
      <div className="Issue-query-builder">
        <Button
          className="filter-button"
          type="primary"
          shape="circle"
          icon="filter"
          onClick={this.showModal}
        />
        <WrappedCollectionForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default IssueQueryBuilder;
