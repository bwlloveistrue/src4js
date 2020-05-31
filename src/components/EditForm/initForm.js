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
      showGroup: props.showGroup ? props.showGroup : false,
      isInit:false,
    };
  }

  componentDidMount(){
    this.setState({isInit:false})
  }

  componentWillReceiveProps(nextProps) {
    
  }

  onChange = (v)=>{
    console.log(v)
  }

  render(){
    const { isInit } = this.props;
    const { form,datas,initDatas } = this.props;
    const { getFieldDecorator } = form&&form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };
    const formItemLayout2 = {
      labelCol: { span: 6 },
      wrapperCol: { span: 11 },
    };
    let values = form.getFieldsValue();
    if(isInit){
      values = initDatas || {}
    }
    return (
      <div className={'initFormContent'}>
        {datas&&<div className={'initFormInfo'}>
          <Row >
            <Col span={24}>
              <FormItem {...formItemLayout} label={'货物类型'}>
                      {Switch.renderComs(form,datas.goodsType,this.onChange,initDatas&&initDatas.goodsType)}
              </FormItem>
            </Col>
          </Row>
          <Row >
            <Col span={24}>
              <FormItem {...formItemLayout} label={'分配状态'}>
                      {Switch.renderComs(form,datas.truckPart,this.onChange,initDatas&&initDatas.truckPart)}
              </FormItem>
            </Col>
          </Row>
          <Row >
          {values.truckPart == '0'&&<Col span={8}>
              <FormItem {...formItemLayout2} label={'车牌'}>
                      {Switch.renderComs(form,datas.truckNumber,this.onChange,initDatas&&initDatas.truckNumber)}
              </FormItem>
              </Col>}
          {values.truckPart == '0'&&<Col  span={8}>
              <FormItem {...formItemLayout2} label={'司机'}>
                    {Switch.renderComs(form,datas.driver,this.onChange,initDatas&&initDatas.driver)}
              </FormItem>
            </Col>}
          {values.truckPart == '1'&&<Col span={8}>
            <FormItem {...formItemLayout2} label={'伙伴'}>
                    {Switch.renderComs(form,datas.partner,this.onChange,initDatas&&initDatas.partner)}
            </FormItem>
            </Col>}
          {values.truckPart == '1'&&<Col span={8}>
            <FormItem {...formItemLayout2} label={'价格'}>
                    {Switch.renderComs(form,datas.partnerPrice,this.onChange,initDatas&&initDatas.partnerPrice)}
            </FormItem>
            </Col>}
          {values.truckPart == '1'&&<Col span={8}>
            <FormItem {...formItemLayout2} label={'载重'}>
                    {Switch.renderComs(form,datas.partnerCarry,this.onChange,initDatas&&initDatas.partnerCarry)}
            </FormItem>
          </Col>}
            
          </Row>
        </div>}
      </div>
    )
  }

}

export default Form.create()(InitForm);