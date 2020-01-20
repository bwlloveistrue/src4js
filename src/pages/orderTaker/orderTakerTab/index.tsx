import { Form, Card, Col, Row } from 'antd';
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

@connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))
class SelectDriving extends Component {
  state = {
    tabKey: 'selectOrderApportion',
  };

  componentDidMount() {}

  componentWillUnmount() {}

  onTabChange = (key: string) => {
    this.setState({
      tabKey: key,
    });
  };

  renderChildrenByTabKey = (tabKey: string) => {
    if (tabKey === 'projects') {
      return <SelectOrderTakers />;
    }
    if (tabKey === 'applications') {
      return <SelectOrderApportion />;
    }
    if (tabKey === 'articles') {
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

export default Form.create()(SelectDriving);
