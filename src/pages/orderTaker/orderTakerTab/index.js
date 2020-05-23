import { Form, Card, Col, Row } from 'antd';
import { Dispatch, Action } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { connect } from 'dva';
import SelectOrderApportion from '../selectOrderApportion';
import SelectOrderReceipt from '../selectOrderReceipt';
import SelectOrderTakers from '../selectOrderTakers';
import styles from './orderTakerTab.less';


const operationTabList = [
  {
    key: 'selectOrderTakers',
    tab: (
      <span>
        订单录入 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'selectOrderApportion',
    tab: (
      <span>
        订单分配 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'selectOrderReceipt',
    tab: (
      <span>
        订单回执 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

class OrderTakerTab extends Component {
  state = {
    tabKey: 'selectOrderTakers',
  };

  componentDidMount() {}

  componentWillUnmount() {}

  onTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  renderChildrenByTabKey = (tabKey) => {
    const toProps = { ...this.props, from: 'fromTab' };
    if (tabKey === 'selectOrderTakers') {
      return <SelectOrderTakers {...toProps} />;
    }
    if (tabKey === 'selectOrderApportion') {
      return <SelectOrderApportion />;
    }
    if (tabKey === 'selectOrderReceipt') {
      return <SelectOrderReceipt />;
    }
    return null;
  };

  render() {
    const { tabKey } = this.state;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={24} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Form.create()(OrderTakerTab);
