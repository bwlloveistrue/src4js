import React from "react";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { Row, Col, Switch, Tag, DatePicker, Tabs, Icon, Form, Input, TimePicker,Button,Checkbox,Select ,InputNumber,Upload  } from 'antd';
const { Option } = Select;
const { RangePicker, MonthPicker,WeekPicker } = DatePicker;
const { TextArea } = Input;

const types = {
    INPUT: "INPUT",
    PASSWORD: "PASSWORD",
    CHECKBOX: "CHECKBOX",
    CHECKBOXGROUP: "CHECKBOXGROUP",
    DATEPICKER: "DATEPICKER",
    TIMEPICKER: "TIMEPICKER",
    SELECT: "SELECT",
    TEXTAREA: "TEXTAREA",
    DATE: "DATE",
    SCOPE: "SCOPE",
    SELECT_LINKAGE: "SELECT_LINKAGE",
    SWITCH: "SWITCH",
    RANGEPICKER: "RANGEPICKER",
    TIMERANGEPICKER: "TIMERANGEPICKER",
    MONTHPICKER:'MONTHPICKER',
    WEEKPICKER:'WEEKPICKER',
    COLORPICKER: "COLORPICKER",
    CASCADER: "CASCADER",
    CASCADERCUSTOMFIELD: "CASCADERCUSTOMFIELD", // CASCADER的子组建
    INPUTNUMBER: "INPUTNUMBER",
    INPUTSEARCH: "INPUTSEARCH",
    PERIOD: "PERIOD",
    UPLOAD: "UPLOAD",
    RICHTEXT: "RICHTEXT",
    TAGGROUP: "TAGGROUP",
    DESCRIPTION: "DESCRIPTION"
  }
const onChange = (value, args,callback)=> {
  typeof callback == 'function'&&callback(value, args);
  // this.props.onChange && this.props.onChange(value, args);
}

const onSelectDelChange = (_key, value, callback)=> {
    typeof callback == 'function'&&callback(value, args);
    // onChange(value,args)
}
const formSwitch = {
renderComs: (form,c,callback,initialValue) => {
    const type = c.conditionType.toUpperCase();
    const { getFieldDecorator } = form&&form;
    const values = form.getFieldsValue();
    initialValue = c.values || initialValue
    if(getFieldDecorator){
        if (type === types.INPUT) {
            return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                {c.viewAttr==1&&
                <div className="wea-form-item-wrapper" style={{display: 'table'}}>
                    <span className="wea-field-readonly">
                        {initialValue}
                    </span>
                </div>}
                
                 <div style={{display:c.viewAttr==1?'none':''}}>
                    {getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue:initialValue
                    })(
                        <Input
                        size="default"
                        placeholder={c.placeholder}
                        {...c.otherParams}
                        onBlur={(v)=>onChange(v.target.value,'',callback)}
                        />,
                    )}
                </div>
            </div>)
        } else if (type === types.PASSWORD){
            return (<div>
                    {getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue:initialValue
                    })(
                        <Input
                        size="default"
                        placeholder={c.placeholder}
                        type={'password'}
                        {...c.otherParams}
                        visibilityToggle={true}
                        onChange={(v)=>onChange(v.target.value,'',callback)}
                        />,
                    )}
                </div>
            )
        } else if (type === types.CHECKBOX){
            return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr==1?
                    <div className="wea-form-item-wrapper" style={{display: 'table'}}>
                        <span className="wea-field-readonly">
                            {initialValue == '1'?'是':'否'}
                        </span>
                     </div>
                    :
                    getFieldDecorator(`${c.domkey[0]}`, {
                                valuePropName:'checked',
                                initialValue: initialValue?initialValue == '1'?true:false:false,
                                rules: c.rules || [],
                    })(
                        <Checkbox
                        {...c.otherParams}
                        onChange={(v,args)=>onChange(v.target.checked,args,callback)}
                        />,
                    )}
                </div>
            )
        } else if (type === types.CHECKBOXGROUP){
            return (<div>
                    {getFieldDecorator(`${c.domkey[0]}`, {
                                valuePropName:'defaultValue',
                                initialValue: initialValue?initialValue:[],
                                rules: c.rules || [],
                    })(
                        <Checkbox.Group
                        option={c.options}
                        {...c.otherParams}
                        onChange={(v,args)=>onChange(v.target.checked,args,callback)}
                        />,
                    )}
                </div>
            )
        } else if (type === types.SELECT){
            let initialValueTemp = [];
            initialValueTemp = typeof initialValue == 'string'?initialValue.split(','):initialValue
            return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {
                        c.viewAttr==1?
                    <div className="wea-form-item-wrapper" style={{display: 'table'}}>
                        <span className="wea-field-readonly">
                            {c.options.map(op=>{
                                if(initialValueTemp.indexOf(op.key) > -1){
                                    return op.showname+" "
                                }else{
                                    return ''
                                }
                            })}
                        </span>
                     </div>
                    :
                    getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        valuePropName:'defaultValue',
                        initialValue:initialValue?initialValue:[]
                    })(
                        <Select
                        allowClear = {true}
                        mode="multiple"
                        dropdownMatchSelectWidth={true}
                        placeholder={c.placeholder}
                        {...c.otherParams}
                        // onSelect={(value,_option)=>this.onSelectChange(c.domkey[0],value,_option)}
                        onSelect={(value,_option)=>onChange(value,_option,callback)}
                        onDeselect={(value,_option)=>onSelectDelChange(c.domkey[0],value,_option,callback)}
                        >
                        {c.options.map(op=>{
                            return <Option key={op.key} value={op.key}>{op.showname}</Option>
                        })}
                        </Select>,
                    )}

                </div>
            )
        } else if (type === types.DATEPICKER){
            initialValue = c.viewAttr==1?initialValue:initialValue?moment(initialValue):moment()
            return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr==1?
                        <div className="wea-form-item-wrapper" style={{display: 'table'}}>
                            <span className="wea-field-readonly">
                                {initialValue}
                            </span>
                        </div>
                        :
                        getFieldDecorator(`${c.domkey[0]}`, {
                            rules: c.rules || [],
                            initialValue:initialValue
                        })(
                            <DatePicker
                            allowClear={true}
                            placeholder={c.placeholder}
                            size={'default'}
                            showTime={true}
                            showToday={true}
                            {...c.otherParams}
                            onChange={(v,dateString)=>onChange(v,dateString,callback)}
                            />
                        )
                    }
                </div>   
            )
        } else if (type === types.TIMEPICKER){
            initialValue = c.viewAttr==1?initialValue:initialValue?moment(initialValue):moment()
            return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr==1?
                        <div className="wea-form-item-wrapper" style={{display: 'table'}}>
                            <span className="wea-field-readonly">
                                {initialValue}
                            </span>
                        </div>
                        :
                    getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue:initialValue
                    })(
                        <TimePicker
                        allowClear={true}
                        placeholder={c.placeholder}
                        size={'default'}
                        showTime={true}
                        showToday={true}
                        {...c.otherParams}
                        onChange={(v,dateString)=>onChange(v,dateString,callback)}
                        />
                    )}
                </div>
            )
        } else if (type === types.RANGEPICKER){
            return (<div>
                    {getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue:initialValue
                    })(
                        <RangePicker
                        allowClear={true}
                        placeholder={c.placeholder}
                        size={'default'}
                        showTime={true}
                        showToday={true}
                        {...c.otherParams}
                        onChange={(v,dateString)=>onChange(v,dateString,callback)}
                        />
                    )}
                </div>
            )
        } else if (type === types.MONTHPICKER){
            initialValue = c.viewAttr==1?initialValue:initialValue?moment(initialValue):moment()
            return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr==1?
                    <div className="wea-form-item-wrapper" style={{display: 'table'}}>
                        <span className="wea-field-readonly">
                            {initialValue}
                        </span>
                    </div>
                :
                getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue:initialValue
                    })(
                        <RangePicker
                        allowClear={true}
                        placeholder={c.placeholder}
                        size={'default'}
                        showTime={true}
                        showToday={true}
                        {...c.otherParams}
                        onChange={(v,dateString)=>onChange(v,dateString,callback)}
                        />
                    )}
                </div>
            )
        } else if (type === types.DATE){
            
            let datas = [
                { value: "0", name: "全部" },
                { value: "1", name: "今天" },
                { value: "2", name: "本周" },
                { value: "3", name: "本月" },
                { value: "4", name: "本季" },
                { value: "5", name: "本年" },
                { value: "7", name: "上个月" },
                { value: "8", name: "上一年" },
                { value: "6", name: "指定日期范围" }
                ];
                return (
                <div>
                {getFieldDecorator(`${c.domkey[0]}`, {
                    rules: c.rules || [],
                })(
                    <Select
                    allowClear = {true}
                    dropdownMatchSelectWidth={true}
                    placeholder={c.placeholder}
                    {...c.otherParams}
                    onChange={(v,option)=>onChange(v,option,callback)}
                    >
                    {datas.map(op=>{
                        return <Option key={op.value} value={op.value}>{op.name}</Option>
                    })}
                    </Select>,
                    
                )}
                {
                    values[c.domkey[0]] == '6'?<div>
                        {getFieldDecorator(`${c.domkey[1] || 'datetime'}`, {
                        rules: c.rules || [],
                    })(
                        <RangePicker
                        allowClear={true}
                        placeholder={c.placeholder}
                        size={'default'}
                        // showTime={true}
                        showToday={true}
                        {...c.otherParams}
                        onChange={(v,dateString)=>onChange(v,dateString,callback)}
                        />
                    )}
                    </div>:''
                }
            </div>
            )
        } else if (type === types.TEXTAREA){
            return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr==1?
                    <div className="wea-form-item-wrapper" style={{display: 'table'}}>
                        <span className="wea-field-readonly">
                            {initialValue}
                        </span>
                    </div>
                    :
                    getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue:initialValue
                    })(
                        <TextArea
                        size="default"
                        placeholder={c.placeholder}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        visibilityToggle={true}
                        {...c.otherParams}
                        onChange={(v)=>onChange(v.target.value,'',callback)}
                        />,
                    )}
                </div>
            )
        } else if (type === types.INPUTNUMBER){
            return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr==1?
                    <div className="wea-form-item-wrapper" style={{display: 'table'}}>
                        <span className="wea-field-readonly">
                            {initialValue}
                        </span>
                    </div>
                    :
                    getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue:initialValue?parseInt(initialValue,10):0
                    })(
                        <InputNumber
                        size="default"
                        placeholder={c.placeholder}
                        {...c.otherParams}
                        onChange={(v)=>onChange(v.target.value,'',callback)}
                        />,
                    )}
                </div>
            )
        } else if (type === types.UPLOAD){
            return (<div>
                    {getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue:initialValue
                    })(
                        <Upload
                        action=""
                        listType="picture-card"
                        {...c.otherParams}
                        onChange={(v)=>onChange(v,'',callback)}
                        />,
                    )}
                </div>
                )
        }
        
    }
    return <Input />
},
}


export default formSwitch;