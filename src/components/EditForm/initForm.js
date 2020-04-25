import { Row, Col, Form } from 'antd';
import React from 'react';
import Switch from '../Switch/index';
const FormItem = Form.Item;

const fields={
  goodsType:{},//货物类型
  truckPart:{},//分配状态
  truckNumber:{},//车牌号
  driver:{},// 司机
  partner:{},//伙伴
  partnerCarry:{},//伙伴
  partnerPrice:{},//伙伴
}

class InitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroup: props.showGroup ? props.showGroup : false
    };
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    
  }

  onChange = (v)=>{
    console.log(v)
  }

  render(){
    const { form,datas } = this.props;
    const { getFieldDecorator } = form&&form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 11 },
    };
    const values = form.getFieldsValue();
    return (
      <div className={'initFormContent'}>
        {datas&&<div className={'initFormInfo'}>
          <Row >
            <Col>
              <FormItem {...formItemLayout} label={'货物类型'}>
                      {Switch.renderComs(form,datas.goodsType,this.onChange)}
              </FormItem>
            </Col>
          </Row>
          <Row >
            <Col>
              <FormItem {...formItemLayout} label={'分配状态'}>
                      {Switch.renderComs(form,datas.truckPart,this.onChange)}
              </FormItem>
            </Col>
          </Row>
          <Row >
          {values.truckPart == 1&&<Col>
              <FormItem {...formItemLayout} label={'车牌'}>
                      {Switch.renderComs(form,datas.truckNumber,this.onChange)}
              </FormItem>
              <FormItem {...formItemLayout} label={'司机'}>
                    {Switch.renderComs(form,datas.driver,this.onChange)}
              </FormItem>
            </Col>}
          {values.truckPart == 2&&<Col>
            <FormItem {...formItemLayout} label={'伙伴'}>
                    {Switch.renderComs(form,datas.driver,this.onChange)}
            </FormItem>
            <FormItem {...formItemLayout} label={'价格'}>
                    {Switch.renderComs(form,datas.partnerPrice,this.onChange)}
            </FormItem>
            <FormItem {...formItemLayout} label={'载重'}>
                    {Switch.renderComs(form,datas.partnerCarry,this.onChange)}
            </FormItem>
          </Col>}
            
          </Row>
        </div>}
      </div>
    )
  }

}

export default Form.create()(InitForm);