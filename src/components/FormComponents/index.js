import { Row, Col, Tag, DatePicker, Tabs, Icon, Form, Input, TimePicker,Button } from 'antd';
import React, { Component } from 'react';
import SearchGroup from '../SearchGroup/index';
import Switch from '../Switch/index';

const FormItem = Form.Item;

class NewForm extends Component{
  static defaultProps = {
    showGroup: true,
    needTigger: true,
    onSubmit: () => {},
    col:3,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('formComponents index didmount');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showGroup !== nextProps.showGroup) {
      this.setState({ showGroup: nextProps.showGroup });
    }
  }

  onChange = (e)=>{
    const { onChange } = this.props
    typeof onChange == 'function'?onChange(e):''
  }

  getFields = () => {
    const { datas,form,col } = this.props;
    const { getFieldDecorator } = form&&form;
    let group = [];
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 11 },
    };

    datas&&datas.data&&datas.data.map((c, index) => {
      let items = [];
      c.items.map((fields) => {
        items.push({
          com: (
            <FormItem {...formItemLayout} label={`${fields.label}`}>
              {Switch.renderComs(form,fields,this.onChange)}
            </FormItem>
          ),
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

  submitForm = (e)=>{
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        if (typeof onSubmit === "function") {
          onSubmit(values);
        }
      }
    });
  }

  render() {
    const { children } = this.props;
    return (
    <div>
      <Form onSubmit={this.submitForm} className={'formComponents'}>
        {this.getFields()}
        {children}
      </Form>
    </div>);
  }
}

export default Form.create()(NewForm);
