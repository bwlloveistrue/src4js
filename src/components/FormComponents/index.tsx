import { Row, Col, Switch, Tag, DatePicker, Tabs, Icon, Form, Input, TimePicker } from 'antd';
import React, { Component } from 'react';
import SearchGroup from '../SearchGroup';
import ItemMap from './map';
const FormItem = Form.Item;

export interface FormProps {
  showGroup?: boolean;
  needTigger?: boolean;
  datas?: any;
}

export interface FormState {}

class NewForm extends Component<FormProps, FormState> {
  static defaultProps = {
    showGroup: true,
    needTigger: true,
  };

  constructor(props: FormProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('formComponents index didmount');
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.showGroup !== nextProps.showGroup) {
      this.setState({ showGroup: nextProps.showGroup });
    }
  }

  getFields = () => {
    const { datas } = this.props;

    let group: any = [];
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 11 },
    };

    Object.keys(ItemMap).forEach(data => {
      if (data === 'data') {
        ItemMap[data] &&
          ItemMap[data].map((c: any, index: any) => {
            let items: any = [];
            c.items.map((fields: any) => {
              items.push({
                com: (
                  <FormItem {...formItemLayout} label={`${fields.label}`}>
                    <Input name={fields.domkey[0]} />
                  </FormItem>
                ),
                colSpan: 1,
                hide: false,
                key: fields.domkey[0],
              });
            });
            group.push(
              <SearchGroup
                col={1}
                needTigger={true}
                title={c.title}
                showGroup={c.defaultshow}
                items={items}
                key={index}
              />,
            );
          });
      }
    });
    return group;
  };

  render() {
    return <div>{this.getFields()}</div>;
  }
}

export default NewForm;
