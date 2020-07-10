import { Button, Form, Input, Card } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'dva';

@connect(({ calendarInfo,loading }) => ({
  calendarInfo,
  loading: loading.effects['calendarInfo/getTableInfo'],
}))
class SelectClient extends Component {

  state = {
    
  }

  constructor(){
    super();
    //设置sate,添加name与age属性
    this.state={
     
    }
  }

  static defaultProps = {
    
  };

  static defaultStates = {
    
  }


  selectForm = undefined;

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  
  render() {
    const { from,loading,calendarInfo } = this.props;
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
                selectedRows={selectedRows}
                loading={loading}
                data={data}
                columns={this.customColumns()}
                showRowSelect = {true}
                showTotalList = {false}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
                scroll={{ y: 500 }}
              />}
          </Card>
          {visible&&<AddClientDialog
            visible={visible}
            clientId={selectedKey}
            type={type}
            onCloseBack={()=>{this.closeAndRefresh()}}
          />}
        </PageTop>
      </div>
    );
  }
}

export default Form.create()(SelectClient);
