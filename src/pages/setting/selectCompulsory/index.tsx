import {
  Form
} from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

@connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))
class SelectCompulsory extends Component {
  

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  render() {
    
    return (
      <PageHeaderWrapper content="高级表单常见于一次性输入和提交大批量数据的场景。">
          
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(SelectCompulsory);
