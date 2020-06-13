import { Button, Form, Input, Card } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import NewForm from '@/components/FormComponents';
import SearchGroup from '@/components/SearchGroup';
import SearchTab from '@/components/SearchTab';
import PageTop from '@/components/PageTop';
import Switch from '@/components/Switch/index';
import NewTable from '@/components/NewTable';
import NewDialog from '@/components/NewDialog';
import NewScroll from '@/components/NewScroll';

const FormItem = Form.Item;

@connect(({ selectFeeType, loading }) => ({
  selectFeeType,
  loading: loading.effects['selectFeeType/getFeeTypeFields'],
}))
class AddFeeTypeDialog extends Component {

  state = {
    selectedRows: [],
  }

  constructor() {
    super();
    this.state = {
      visible: false,
      feeTypeId: ''
    }
  }

  static defaultProps = {

  };

  static defaultStates = {

  }

  selectForm = undefined;

  componentDidMount() {
    const { type, feeTypeId } = this.props
    if (type == 'add') {
      this.onAdd();
    }
    if (type == 'edit') {
      this.onEdit(feeTypeId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.state
    const { feeTypeId } = this.props
    if (nextProps.visible != visible && nextProps.visible) {
      this.setState({ visible: nextProps.visible, feeTypeId: feeTypeId })
    } else if (!nextProps.visible) {
      this.setState({ visible: nextProps.visible })
    }
  }

  componentWillUnmount() { }

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectFeeType/getFeeTypeFields',
      payload: {},
    });
    this.setState({ visible: true, feeTypeId: '' })
  }

  onEdit = (key = '') => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectFeeType/getFeeTypeFields',
      payload: {
        id: key
      },
    });
    this.setState({ visible: true, feeTypeId: key, type: 'edit' })
  }

  getFields = () => {
    const { form, col, selectFeeType } = this.props;
    const { condition } = selectFeeType
    const { getFieldDecorator } = form && form;
    let group = [];
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 11 },
    };
    condition && condition.data && condition.data.map((c, index) => {
      let items = [];
      c.items.map((fields) => {
        items.push({
          com: (
            <FormItem {...formItemLayout} label={`${fields.label}`}>
              {Switch.renderComs(form, fields)}
            </FormItem>
          ),
          colSpan: 2,
          hide: false,
          key: fields.domkey[0],
        });
      });
      group.push(
        <SearchGroup
          col={col}
          needTigger={true}
          title={c.title}
          showGroup={c.defaultshow}
          items={items}
          key={index}
        />,
      );
    });

    return group;
  };

  getButton = () => {
    let buttonsCreate = [
      <Button key="doEdit" type="primary" disabled={false} onClick={this.onSave}>{'保存'}</Button>,
    ]
    return buttonsCreate;
  }

  onSave = () => {
    const { dispatch, feeTypeId, type } = this.props;
    this.selectForm.validateFields((errors, values) => {
      if (errors) {
        console.log(errors)
      } else {
        let params = this.selectForm.getFieldsValue();
        params = {...params,id:feeTypeId}
        const dispatchType = type=='add'?'selectFeeType/add':'selectFeeType/update'
        dispatch({
          type: dispatchType,
          payload: {
            ...params
          },
          callback: () => {
            this.onClose();
          }
        });
      }
    });

  }

  onClose = () => {
    this.setState({ visible: false });
    this.props.onCloseBack && this.props.onCloseBack();
  }

  render() {
    const { loading, selectFeeType, feeTypeId } = this.props;
    const { showSearchAd, timeSag, selectedRows, visible } = this.state;
    const { data, columns, infoFields } = selectFeeType;
    const title = feeTypeId == '' ? '新增费用' : '编辑费用'
    return (
      <div>
        <NewDialog
          ref='orderTakers_dialog'
          visible={visible}
          title={title}
          icon="icon-coms-meeting"
          iconBgcolor="#f14a2d"
          className="meetingDialog"
          buttons={this.getButton()}
          style={{ width: 'calc(100% - 200px)', height: '700px' }}
          onCancel={() => this.onClose()}
          scalable={true}
        >
          <NewForm
            ref={(form) => {
              this.selectForm = form;
            }}
            datas={infoFields}
            col={6}
          >
          </NewForm>
        </NewDialog>
      </div>
    );
  }
}

export default Form.create()(AddFeeTypeDialog);
