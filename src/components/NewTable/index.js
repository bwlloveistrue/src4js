import { Alert, Table } from 'antd';
import { ColumnProps, TableRowSelection, TableProps } from 'antd/es/table';
import React, { Component, Fragment } from 'react';

import styles from './style.less';

const defaultLocale = {
  className: "",
  customColCancel: "取消",
  customColSave: "保存",
  customColSelect: "待选列名",
  customColSelected: "已选列名",
  customColTitle: "显示列定制",
  first_page: "第一页",
  items_per_page: "条/页",
  jump_to: "跳至",
  last_page: "最后一页",
  loading: "加载中...",
  next_5: "向后 5 页",
  next_page: "下一页",
  operates: "操作",
  page: "页",
  prev_5: "向前 5 页",
  prev_page: "上一页",
};


function initTotalList(columns) {
  if (!columns) {
    return [];
  }
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class NewTable extends Component {

  static defaultProps = { 
    showRowSelect: false,
    showTotalList: false,
  }

  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  handleRowSelectChange = (
    selectedRowKeys,
    selectedRows,
  ) => {
    const currySelectedRowKeys = selectedRowKeys;
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex || 0]), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRowKeys,selectedRows);
    }

    this.setState({ selectedRowKeys: currySelectedRowKeys, needTotalList });
  };

  handleTableChange = (
    pagination,
    filters,
    sorter,
    ...rest
  ) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  };

  cleanSelectedKeys = () => {
    if (this.handleRowSelectChange) {
      this.handleRowSelectChange([], []);
    }
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data, rowKey, size,showRowSelect,showTotalList, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};

    const paginationProps = pagination
      ? {
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          locale: defaultLocale,
          total: 297,
          showTotal: (total)=>{`共${total}条`},
          ...pagination,
        }
      : false;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record) => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        {showTotalList&&<div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map((item, index) => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    {'总计 '}
                    <span style={{ fontWeight: 600 }}>
                      {item.render
                        ? item.render(item.total, item , index)
                        : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>}
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={showRowSelect&&rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          size={size || 'small'}
          {...rest}
        />
      </div>
    );
  }
}

export default NewTable;
