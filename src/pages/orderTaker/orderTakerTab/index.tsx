import { Form, Card, Col, Row } from 'antd';
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { GridContent } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { connect } from 'dva';
import SelectOrderApportion from '../selectOrderApportion';
import SelectOrderReceipt from '../selectOrderReceipt';
import SelectOrderTakers from '../selectOrderTakers';
import styles from './orderTakerTab.less';
import { StateType } from '../selectOrderTakers/model';

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

// interface SelectOrderTakersProps extends FormComponentProps {
//   dispatch: Dispatch<
//     Action<
//       | 'listAndtableList/add'
//       | 'listAndtableList/fetch'
//       | 'listAndtableList/remove'
//       | 'listAndtableList/update'
//     >
//   >;
//   loading: boolean;
//   listAndtableList: StateType;
// }

interface OrderTakerTabProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'selectOrderTakers/add'
      | 'selectOrderTakers/fetch'
      | 'selectOrderTakers/remove'
      | 'selectOrderTakers/update'
    >
  >;
  loading: boolean;
  from: string;
  selectOrderTakers: StateType;
}

interface OrderTakerTabStates {
  tabKey: string;
}

@connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))
class OrderTakerTab extends Component<OrderTakerTabProps, OrderTakerTabStates> {
  state: OrderTakerTabStates = {
    tabKey: 'selectOrderTakers',
  };

  componentDidMount() {}

  componentWillUnmount() {}

  onTabChange = (key: string) => {
    this.setState({
      tabKey: key,
    });
  };

  renderChildrenByTabKey = (tabKey: string) => {
    const toProps = { ...this.props, from: 'fromTab' };
    if (tabKey === 'selectOrderTakers') {
      // const selectOrderTakersProps:SelectOrderTakersProps={
      //   dispatch: this.props.dispatch,
      //   loading: false,
      //   form: this.props.form,
      //   listAndtableList:this.props.listAndtableList
      // }
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
