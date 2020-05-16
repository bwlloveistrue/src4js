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
import TableEdit from '@/components/TableEdit';
import NewScroll from '@/components/NewScroll';

const FormItem = Form.Item;

@connect(({ selectOrderTakers,loading }) => ({
  selectOrderTakers,
  loading: loading.effects['selectOrderTakers/getOrderTakersFields'],
}))
class OrderTakersDialog extends Component {

  state = {
    selectedRows: [],
  }

  constructor(){
    super();
    this.state={
      visible:false,
      orderTakersId:''
    }
  }

  static defaultProps = {
    
  };

  static defaultStates = {
    
  }

  selectForm = undefined;

  componentDidMount() {
    const {type , orderTakersId } = this.props
    if(type == 'add'){
      this.onAdd();
    }
    if(type == 'edit'){
      this.onEdit(orderTakersId);
    }
  }

  componentWillReceiveProps(nextProps){
    const { visible } = this.state
    const {type , orderTakersId } = this.props
    if(nextProps.visible != visible && nextProps.visible){
      this.setState({visible:nextProps.visible,orderTakersId:orderTakersId})
    }else if(!nextProps.visible){
      this.setState({visible:nextProps.visible})
    }
  }

  componentWillUnmount() {}

  onAdd = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'selectOrderTakers/getOrderTakersFields',
      payload: {},
    });
    this.setState({visible:true,orderTakersId:''})
  }

  onEdit = (key='')=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'selectOrderTakers/getOrderTakersFields',
      payload: {
        id: key
      },
    });
    this.setState({visible:true,selectedKey:key,type:'edit'})
  }

  getFields = () => {
    const { form,col,selectOrderTakers } = this.props;
    const { condition } = selectOrderTakers
    const { getFieldDecorator } = form&&form;
    let group = [];
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 11 },
    };
    condition&&condition.data&&condition.data.map((c, index) => {
        let items = [];
        c.items.map((fields) => {
          items.push({
            com: (
              <FormItem {...formItemLayout} label={`${fields.label}`}>
                {Switch.renderComs(form,fields)}
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

  getButton = ()=>{
    let buttonsCreate =[
      <Button key="doEdit" type="primary" disabled={false} onClick={this.onSave}>{'保存'}</Button>,
    ]
    return buttonsCreate;
  }

  onSave = ()=>{
    const { dispatch , orderTakersId} = this.props;
    this.selectForm.validateFields((errors, values) => {
      if(errors){
        console.log(errors)
      }else{
        this.orderTakerRef.validateFields((errors, values) => {
          if(errors){
            console.log(errors)
          }else{
            const values = this.selectForm.getFieldsValue();
            const orderTakerInfo = this.orderTakerRef.getEditTable()
            
            const type = orderTakersId == ''?'selectOrderTakers/add':'selectOrderTakers/update';
            console.log('save  values====',values)
            console.log('save  orderTakerInfo====',orderTakerInfo)
            dispatch({
              type: type,
              payload: {
                orderTakerInfo:JSON.stringify(orderTakerInfo),
                mainInfo:JSON.stringify(values)
              },
              callback:()=>{
                this.onClose();
              }
            });
          }
        });
      }
    });
    
  }

  onClose = () => {
    this.setState({visible:false});
    this.props.onCloseBack&&this.props.onCloseBack();
  }

  editChange = (_key, datas)=>{
    console.log('_key',_key)
    console.log('datas',datas)
  }

  render() {
    const { from,loading,selectOrderTakers } = this.props;
    const { showSearchAd, timeSag,selectedRows,visible  } = this.state;
    const {data,columns,infoFields, orderTakerInfoColumns,orderTakerInfoDetail} = selectOrderTakers;
    return (
      <div>
          <NewDialog
          ref='orderTakers_dialog'
          visible={visible}
          title={'订单录入'}
          icon="icon-coms-meeting"
          iconBgcolor="#f14a2d"
          className="meetingDialog"
          buttons={this.getButton()}
          style={{width: 'calc(100% - 200px)', height: '700px'}}
          onCancel={() => this.onClose()}
          scalable={true}
          >
            <NewForm 
              ref={(form) => {
                this.selectForm = form;
              }}
              datas = {infoFields}
              col = {6}
            >
              <NewScroll height={'600px'}>
                {orderTakerInfoColumns.length>0&&<TableEdit ref={(orderTakerRef)=>{this.orderTakerRef = orderTakerRef}} datas={orderTakerInfoDetail} columns={orderTakerInfoColumns} onChange={(_key,datas)=>this.editChange(_key,datas)}/>}
              </NewScroll>
            </NewForm>
          </NewDialog>
      </div>
    );
  }
}

export default Form.create()(OrderTakersDialog);
