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
  loading: loading.effects['selectOrderTakers/getTableInfo'],
}))
class SelectOrderTakers extends Component {

  state = {
    selectedRows: [],
  }

  constructor(){
    super();
    //设置sate,添加name与age属性
    this.state={
      showSearchAd: false,
      timeSag: 0,
      selectedRows: [],
      visible:false,
      selectedKey:'',
    }
  }

  static defaultProps = {
    
  };

  static defaultStates = {
    
  }


  selectForm = undefined;

  componentDidMount() {
    this.getCondition();
    this.getTableInfo();
  }

  componentWillUnmount() {}

  getCondition = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectOrderTakers/getCondition',
    });
  };

  getTableInfo = () => {
    const { dispatch,form } = this.props;
    const values = form.getFieldsValue();
    dispatch({
      type: 'selectOrderTakers/getTableInfo',
      payload: values,
      callback: (res) => {
        if (res) {
          console.log(res);// 请求完成后返回的结果
        }
      },
    });
  };

  getTabButtonsAd() {
    const { form } = this.props;
    let btns=[
      <Button type='primary' onClick={() => {
        this.getTableInfo();
      }}>{'搜索'}</Button>,
      <Button type="ghost" onClick={() => this.resetFormFields()}>{'重置'}</Button>,
      <Button type="ghost" onClick={() => this.setState({showSearchAd:false})}>{'取消'}</Button>,
    ]
    return btns;
  }

  resetFormFields = ()=>{
    const { form } = this.props;
    form.resetFormFields();
  }

  getBtns = () => {
    const {selectedRows} = this.state;
    let btns = [
      (<Button type='primary' key={'new'} onClick={this.onAdd}>{'新增'}</Button>)
    ];
    
    btns.push(<Button type='primary' disabled={selectedRows.length > 0?false:true} key={'delete'} onClick={()=>this.onDelete()}>{'删除'}</Button>)
    btns.push(<Button type='primary' key={'exportExcel'} onClick={() => console.log('jiefeng')}>{'导出EXCEL'}</Button>)
    return btns;
  }

  onAdd = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'selectOrderTakers/getOrderTakersFields',
      payload: {},
    });
    this.setState({visible:true,selectedKey:''})
  }

  onEdit = (key='')=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'selectOrderTakers/getOrderTakersFields',
      payload: {
        id: key
      },
    });
    this.setState({visible:true,selectedKey:key})
  }

  onDelete = ()=>{
    const { dispatch } = this.props;
    const { selectedRows } = this.state
    dispatch({
      type: 'selectOrderTakers/delete',
      payload: {
        id: selectedRows
      },
    });
    this.setState({selectedRows:[]})
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

  handleSelectRows = (keys,rows) => {
    console.log(keys)
    this.setState({
      selectedRows: keys,
    });
  };

  getValue = (obj) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

  handleStandardTableChange = (
    pagination,
    filtersArg,
    sorter,
  ) => {
    const { dispatch,form } = this.props;
    const values = form.getFieldsValue();
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = this.getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...values,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'selectOrderTakers/getTableInfo',
      payload: params,
    });
  };

  getButton = ()=>{
    let buttonsCreate =[
      <Button key="doEdit" type="primary" disabled={false} onClick={this.onSave}>{'保存'}</Button>,
    ]

    return buttonsCreate;
  }

  onSave = ()=>{
    const { dispatch } = this.props;
    const { selectedKey } = this.state;
    this.selectForm.validateFields((errors, values) => {
      if(errors){
        console.log(errors)
      }
    });
    const values = this.selectForm.getFieldsValue();
    const orderTakerInfo = this.orderTakerRef.getEditTable()
    console.log('save  values====',values)
    console.log('save  orderTakerInfo====',orderTakerInfo)
    this.orderTakerRef.validateFields((errors, values) => {
      if(errors){
        console.log(errors)
      }
    });
    const type = selectedKey == ''?'selectOrderTakers/add':'selectOrderTakers/update';
    
    dispatch({
      type: type,
      payload: {
        orderTakerInfo:JSON.stringify(orderTakerInfo),
        mainInfo:JSON.stringify(values)},
      
    });
  }

  onlyClose = () => {
    this.setState({visible:false});
  }

  editChange = (_key, datas)=>{
    // console.log('_key',_key)
    // console.log('datas',datas)
  }

  customColumns = ()=>{
    const { selectOrderTakers } = this.props;
    const {columns} = selectOrderTakers;
    let [...newColumns] = columns;
    newColumns.push({
      dataIndex: "operate",
      key: "operate",
      title: "操作",
      width:'5%',
      render:(text, record) => {
        return (
          <Button key="doEdit" type="primary" disabled={false} onClick={()=>this.onEdit(record.key)}>{'查看'}</Button>
        )
      }
        
    })
    return newColumns;
  }

  customListInfo = () =>{
    const { selectOrderTakers } = this.props;
    const {data} = selectOrderTakers;
    
    return columns;
  }

  tabChange = (_tabKey = 0)=>{
    const { dispatch,form } = this.props;
    const values = form.getFieldsValue();
    this.setState({timeSag: _tabKey});
    form.setFieldsValue({
      timeSag: _tabKey
    })
    const params = {
      ...values,
      timeSag:_tabKey,
    };
    dispatch({
      type: 'selectOrderTakers/getTableInfo',
      payload: params,
    });
  }

  // onScale = () => {
  //   setTimeout(() => {
  //     const { setState } = this.props.meetingDialog;
  //     if(this.refs.weameeting_dialog && this.refs.weameeting_dialog.state ) {
  //       setState({weaDialogContentHeight: this.refs.weameeting_dialog.state.height});
  //     }
  //   }, 250);
  // }

  render() {
    const { from,loading,selectOrderTakers } = this.props;
    const { showSearchAd, timeSag,selectedRows,visible  } = this.state;
    const {data,columns,infoFields, orderTakerInfoColumns,orderTakerInfoDetail} = selectOrderTakers;
    const topTab = [
      {
        groupid: 'all',
        title: '全部',
        viewcondition: '0'
      },
      {
        groupid: 'today',
        title: '今天',
        viewcondition: '1'
      },
      {
        groupid: 'theWeek',
        title: '本周',
        viewcondition: '2'
      },
      {
        groupid: 'theMon',
        title: '本月',
        viewcondition: '3'
      },
      {
        groupid: 'local',
        title: '本季',
        viewcondition: '4'
      },
      {
        groupid: 'theYear',
        title: '本年',
        viewcondition: '5'
      },
    ]
    return (
      <div>
        <PageTop
          buttons={this.getBtns()}
          buttonSpace={10}
        >
        <SearchTab
          datas = {topTab}
          keyParam="viewcondition"
          countParam="groupid"
          searchType={['base', 'advanced']}
          selectedKey={timeSag}
          showSearchAd={showSearchAd}
          onChange={(v) => {
            this.tabChange(v)
          }}
          buttonsAd={this.getTabButtonsAd()}
          setShowSearchAd={() => this.setState({showSearchAd: !showSearchAd})}
          hideSearchAd={() => this.setState({showSearchAd: false})}
          onSearch={() => {this.getTableInfo();}}
          searchsAd={this.getFields()}
          type={'line'}
          />
          <Card bordered={false}>
            {columns.length>0&&<NewTable
                selectedRows={selectedRows}
                loading={loading}
                data={data}
                columns={this.customColumns()}
                showRowSelect = {true}
                showTotalList = {true}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
                scroll={{ y: 500 }}
              />}
          </Card>
          <NewDialog
          ref='orderTakers_dialog'
          visible={visible}
          title={'订单录入'}
          icon="icon-coms-meeting"
          iconBgcolor="#f14a2d"
          className="meetingDialog"
          buttons={this.getButton()}
          style={{width: 'calc(100% - 200px)', height: '700px'}}
          onCancel={() => this.onlyClose()}
          scalable={true}
          // onScale={() => this.onScale()}
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
        </PageTop>
      </div>
    );
  }
}

export default Form.create()(SelectOrderTakers);
