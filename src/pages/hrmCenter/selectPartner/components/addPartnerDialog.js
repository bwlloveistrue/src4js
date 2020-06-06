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

@connect(({ selectPartner, loading }) => ({
  selectPartner,
  loading: loading.effects['selectPartner/getPartnerFields'],
}))
class AddPartnerDialog extends Component {

  state = {
    selectedRows: [],
  }

  constructor() {
    super();
    this.state = {
      visible: false,
      partnerId: ''
    }
  }

  static defaultProps = {

  };

  static defaultStates = {

  }

  selectForm = undefined;

  componentDidMount() {
    const { type, partnerId } = this.props
    if (type == 'add') {
      this.onAdd();
    }
    if (type == 'edit') {
      this.onEdit(partnerId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.state
    const { partnerId } = this.props
    if (nextProps.visible != visible && nextProps.visible) {
      this.setState({ visible: nextProps.visible, partnerId: partnerId })
    } else if (!nextProps.visible) {
      this.setState({ visible: nextProps.visible })
    }
  }

  componentWillUnmount() { }

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectPartner/getPartnerFields',
      payload: {},
    });
    this.setState({ visible: true, partnerId: '' })
  }

  onEdit = (key = '') => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectPartner/getPartnerFields',
      payload: {
        id: key
      },
    });
    this.setState({ visible: true, partnerId: key, type: 'edit' })
  }

  getFields = () => {
    const { form, col, selectPartner } = this.props;
    const { condition } = selectPartner
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
    const { dispatch, partnerId, type } = this.props;
    this.selectForm.validateFields((errors, values) => {
      if (errors) {
        console.log(errors)
      } else {
        let params = this.selectForm.getFieldsValue();
        params = {...params,id:partnerId}
        const dispatchType = type=='add'?'selectPartner/add':'selectPartner/update'
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
    const { loading, selectPartner, partnerId } = this.props;
    const { showSearchAd, timeSag, selectedRows, visible } = this.state;
    const { data, columns, infoFields, orderTakerInfoColumns, orderTakerInfoDetail } = selectPartner;
    const title = partnerId == '' ? '新增车辆' : '编辑车辆'
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
          style={{ width: 'calc(100% - 200px)', height: '450px' }}
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

export default Form.create()(AddPartnerDialog);
