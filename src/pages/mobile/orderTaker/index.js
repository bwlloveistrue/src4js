import { Button, Form, Input, Card } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'dva';

@connect(({ selectOrderTakers,selectTruck,loading }) => ({
  selectOrderTakers,
  selectTruck,
  loading: loading.effects['selectOrderTakers/getTableInfo'],
}))
class SelectOrderTakers extends Component {

  componentDidMount() {
    
  }

  componentWillUnmount() {}

  render() {
    const { from,loading,selectOrderTakers } = this.props;
    return (
      <div>
        
      </div>
    );
  }
}

export default Form.create()(SelectOrderTakers);
