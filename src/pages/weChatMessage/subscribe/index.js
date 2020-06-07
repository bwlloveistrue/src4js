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

@connect(({ selectSubscribe,loading }) => ({
  selectSubscribe,
  loading: loading.effects['selectSubscribe/getTableInfo'],
}))
class SelectSubscribe extends Component {

  state = {
    selectedRows: [],
  }

  constructor(){
    super();
    //设置sate,添加name与age属性
    this.state={
      showSearchAd: false,
      selectedRows: [],
      visible:false,
      selectedKey:'',
      type:''
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
      type: 'selectSubscribe/getCondition',
    });
  };

  getTableInfo = () => {
    const { dispatch,form } = this.props;
    const values = form.getFieldsValue();
    dispatch({
      type: 'selectSubscribe/getTableInfo',
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
    let btns = [];
    // let btns = [
    //   (<Button type='primary' key={'new'} onClick={this.onAdd}>{'新增'}</Button>)
    // ];
    
    // btns.push(<Button type='primary' disabled={selectedRows.length > 0?false:true} key={'delete'} onClick={()=>this.onDelete()}>{'删除'}</Button>)
    return btns;
  }

  onAdd = ()=>{
    this.setState({visible:true,selectedKey:'',type:'add'})
  }

  onEdit = (key='')=>{
    this.setState({visible:true,selectedKey:key,type:'edit'})
  }

  onDelete = ()=>{
    const { dispatch } = this.props;
    const { selectedRows } = this.state
    dispatch({
      type: 'selectSubscribe/delete',
      payload: {
        delIds: selectedRows.join(','),
      },
      callback:()=>{this.closeAndRefresh()}
    });
    this.setState({selectedRows:[]})
  }
  getFields = () => {
    const { form,col,selectSubscribe } = this.props;
    const { condition } = selectSubscribe
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
            col={c.col || col || 6}
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
      type: 'selectSubscribe/getTableInfo',
      payload: params,
    });
  };

  onlyClose = () => {
    this.setState({visible:false});
  }

  closeAndRefresh = () => {
    this.setState({visible:false});
    this.getTableInfo();
  }

  customColumns = ()=>{
    const { selectSubscribe } = this.props;
    const {columns} = selectSubscribe;
    let [...newColumns] = columns;
    // newColumns.push({
    //   dataIndex: "operate",
    //   key: "operate",
    //   title: "操作",
    //   width:'5%',
    //   render:(text, record) => {
    //     return (
    //       <Button key="doEdit" type="primary" disabled={false} onClick={()=>this.onEdit(record.key)}>{'查看'}</Button>
    //     )
    //   }
        
    // })
    return newColumns;
  }

  customListInfo = () =>{
    const { selectSubscribe } = this.props;
    const {data} = selectSubscribe;
    
    return columns;
  }

  render() {
    const { from,loading,selectSubscribe } = this.props;
    const { showSearchAd, selectedRows,visible , selectedKey,type } = this.state;
    const {data,columns,infoFields, orderTakerInfoColumns,orderTakerInfoDetail} = selectSubscribe;
    return (
      <div>
        <PageTop
          buttons={this.getBtns()}
          buttonSpace={10}
        >
        <SearchTab
          keyParam="viewcondition"
          countParam="groupid"
          searchType={['base', 'advanced']}
          showSearchAd={showSearchAd}
          buttonsAd={this.getTabButtonsAd()}
          setShowSearchAd={() => this.setState({showSearchAd: !showSearchAd})}
          hideSearchAd={() => this.setState({showSearchAd: false})}
          onSearch={() => {this.getTableInfo();}}
          searchsAd={this.getFields()}
          type={'line'}
          />
          <Card bordered={false}>
            {columns.length>0&&<NewTable
                // selectedRows={selectedRows}
                loading={loading}
                data={data}
                columns={this.customColumns()}
                // showRowSelect = {true}
                showTotalList = {false}
                // onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
                scroll={{ y: 500 }}
              />}
          </Card>
        </PageTop>
      </div>
    );
  }
}

export default Form.create()(SelectSubscribe);
