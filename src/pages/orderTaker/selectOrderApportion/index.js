import { Button, Form, Input, Card } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action, combineReducers } from 'redux';
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
import EditForm from '@/components/EditForm';
import ApportionDialog from './components/apportionDialog';
import OrderTakersDialog from '../selectOrderTakers/components/orderTakersDialog';
import $ from 'jquery'

const FormItem = Form.Item;

@connect(({ selectOrderApportion, loading }) => {
  return {
    selectOrderApportion,
    loading: loading.effects['selectOrderApportion/getTableInfo'],
  }
})
class selectOrderApportion extends Component {
  constructor() {
    super();
    //设置sate,添加name与age属性
    this.state = {
      showSearchAd: false,
      timeSag: 0,
      selectedRows: [],
      apportionVisible: false,
      orderTakersVisible: false,
      selectedKey: '',
      orderStatus:0,
      dialogHeight: 700,
      editFormHeight: 0,
    }
  }

  static defaultProps = {

  };

  static defaultStates = {

  }


  selectForm = undefined;

  componentDidMount() {
    this.getCondition();
    // this.getTableInfo();

  }

  componentWillReceiveProps(nextProps) {
    const { dialogHeight } = this.state
    const baseInfoHeight = $(this.refs.formDivRef).height()
    const editFormHeight = dialogHeight - baseInfoHeight;
    this.setState({ editFormHeight: editFormHeight })
  }



  componentWillUnmount() { }

  getCondition = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectOrderApportion/getCondition',
      callback:()=>{this.getTableInfo()}
    });
  };

  getTableInfo = () => {
    const { dispatch, form } = this.props;
    const values = form.getFieldsValue();
    dispatch({
      type: 'selectOrderApportion/getTableInfo',
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
    let btns = [
      <Button type='primary' onClick={() => {
        this.getTableInfo();
        this.setState({showSearchAd: false})
      }}>{'搜索'}</Button>,
      <Button type="ghost" onClick={() => this.resetFormFields()}>{'重置'}</Button>,
      <Button type="ghost" onClick={() => this.setState({ showSearchAd: false })}>{'取消'}</Button>,
    ]
    return btns;
  }

  resetFormFields = () => {
    const { form } = this.props;
    form.resetFormFields();
  }

  getBtns = () => {
    const { selectedRows } = this.state;
    let btns = [];

    btns.push(<Button type='primary' disabled={selectedRows.length > 0 ? false : true} key={'delete'} onClick={() => this.onDelete()}>{'删除'}</Button>)
    btns.push(<Button type='primary' key={'exportExcel'} onClick={() => console.log('jiefeng')}>{'导出EXCEL'}</Button>)
    return btns;
  }

  onAdd = () => {
    this.setState({ orderTakersVisible: true })
  }

  onDispatch = (key = '',orderStatus=0) => {
    this.setState({ apportionVisible: true, selectedKey: key,orderStatus:orderStatus })
  }

  onDelete = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state
    dispatch({
      type: 'selectOrderApportion/delete',
      payload: {
        id: selectedRows.join(',')
      },
    });
    this.setState({ selectedRows: [] })
  }

  getFields = () => {
    const { form, col, selectOrderApportion } = this.props;
    const { condition } = selectOrderApportion
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

  handleSelectRows = (keys, rows) => {
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
    const { dispatch, form } = this.props;
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
      type: 'selectOrderApportion/getTableInfo',
      payload: params,
    });
  };

  onApportionClose = () => {
    this.setState({ apportionVisible: false });
    this.getTableInfo();
  }

  onOrderTakersClose = () => {
    this.setState({ orderTakersVisible: false });
    this.getTableInfo();
  }

  editChange = (_key, datas) => {
    // console.log('_key',_key)
    // console.log('datas',datas)
  }

  customColumns = () => {
    const { selectOrderApportion } = this.props;
    const { columns } = selectOrderApportion;
    let [...newColumns] = columns;
    newColumns.push({
      dataIndex: "operate",
      key: "operate",
      title: "操作",
      width: '5%',
      render: (text, record) => {
        return (
          <Button key="doEdit" type="primary" disabled={false} onClick={() => this.onDispatch(record.key,record.orderStatus)}>{record.orderStatus!=1?'分配':'查看'}</Button>
        )
      }

    })
    return newColumns;
  }

  customListInfo = () => {
    const { selectOrderApportion } = this.props;
    const { data } = selectOrderApportion;

    return columns;
  }

  tabChange = (_tabKey = 0) => {
    const { dispatch, form } = this.props;
    const values = form.getFieldsValue();
    this.setState({ timeSag: _tabKey });
    form.setFieldsValue({
      timeSag: _tabKey
    })
    const params = {
      ...values,
      timeSag: _tabKey,
    };
    dispatch({
      type: 'selectOrderApportion/getTableInfo',
      payload: params,
    });
  }

  render() {
    const { from, loading, selectOrderApportion } = this.props;
    const { showSearchAd, timeSag, selectedRows, apportionVisible, orderTakersVisible, dialogHeight, editFormHeight, selectedKey,orderStatus } = this.state;
    const { data, columns, infoFields, initFormFields, initDatas } = selectOrderApportion;
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
            datas={topTab}
            keyParam="viewcondition"
            countParam="groupid"
            searchType={['base', 'advanced']}
            selectedKey={timeSag}
            showSearchAd={showSearchAd}
            onChange={(v) => {
              this.tabChange(v)
            }}
            buttonsAd={this.getTabButtonsAd()}
            setShowSearchAd={() => this.setState({ showSearchAd: !showSearchAd })}
            hideSearchAd={() => this.setState({ showSearchAd: false })}
            onSearch={() => { this.getTableInfo(); }}
            searchsAd={this.getFields()}
            type={'line'}
          />
          <Card bordered={false}>
            {columns.length > 0 && <NewTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.customColumns()}
              onSelectRow={this.handleSelectRows}
              showRowSelect={true}
              showTotalList={true}
              onChange={this.handleStandardTableChange}
              showChild={true}
              scroll={{ y: 500 }}
            />}
          </Card>
          {apportionVisible && <ApportionDialog
            visible={apportionVisible}
            orderTakerId={selectedKey}
            orderStatus={orderStatus}
            onCloseBack={() => { this.onApportionClose() }}
          />}
          {orderTakersVisible&&
            <OrderTakersDialog
              visible={orderTakersVisible}
              orderTakersId={''}
              type={'add'}
              onCloseBack={() => { this.onOrderTakersClose() }}
            />
          }
        </PageTop>
      </div>
    );
  }
}

export default Form.create()(selectOrderApportion);
