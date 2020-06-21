import React from "react";
import moment from 'moment';
import 'moment/locale/zh-cn';
import NewCheckbox from '../NewCheckbox/index'
import NewSwitch from '../NewSwitch/index'
import NewSelect from '../NewSelect/index'
import NewDatePicker from '../NewDatePicker/index'
import NewCheckboxGroup from '../NewCheckboxGroup/index'
import NewRadioGroup from '../NewRadioGroup/index'
import NewUpload from '../NewUpload/index'
moment.locale('zh-cn');

import { Row, Col, Switch, Tag, DatePicker, Tabs, Icon, Form, Input, TimePicker, Button, Checkbox, Select, InputNumber, Upload } from 'antd';
const { Option } = Select;
const { RangePicker, MonthPicker, WeekPicker } = DatePicker;
const { TextArea } = Input;

const types = {
    INPUT: "INPUT",
    PASSWORD: "PASSWORD",
    CHECKBOX: "CHECKBOX",
    CHECKBOXGROUP: "CHECKBOXGROUP",
    RADIOGROUP: "RADIOGROUP",
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
    MONTHPICKER: 'MONTHPICKER',
    WEEKPICKER: 'WEEKPICKER',
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
const onChange = (value, args, callback) => {
    typeof callback == 'function' && callback(value, args);
    // this.props.onChange && this.props.onChange(value, args);
}

const normFile = e =>{
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
}

const formSwitch = {
    renderComs: (form, c, callback, initialValue) => {
        const type = c.conditionType.toUpperCase();
        const { getFieldDecorator } = form && form;
        const values = form.getFieldsValue();
        initialValue = c.value || initialValue
        if(values && values[c.domkey[0]]){
            initialValue = values[c.domkey[0]]
        }
        
        if (getFieldDecorator) {
            if (type === types.INPUT) {
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValue}
                            </span>
                        </div>}

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {getFieldDecorator(`${c.domkey[0]}`, {
                            rules: c.rules || [],
                            initialValue: initialValue
                        })(
                            <Input
                                size="default"
                                placeholder={c.placeholder}
                                {...c.otherParams}
                                onBlur={(v) => onChange({ domkey: c.domkey[0], value: v.target.value }, '', callback)}
                            />,
                        )}
                    </div>
                </div>)
            } else if (type === types.PASSWORD) {
                return (<div>
                    {getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue: initialValue
                    })(
                        <Input
                            size="default"
                            placeholder={c.placeholder}
                            type={'password'}
                            {...c.otherParams}
                            visibilityToggle={true}
                            onChange={(v) => onChange({ domkey: c.domkey[0], value: v.target.value }, '', callback)}
                        />,
                    )}
                </div>
                )
            } else if (type === types.CHECKBOX) {
                if (!initialValue || initialValue == '') {
                    initialValue = '0';
                }
                initialValue = parseInt(initialValue, 10)
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValue == '1' ? '是' : '否'}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                initialValue: initialValue,
                                rules: c.rules || [],
                            })(
                                <NewCheckbox
                                    onChange={(v) => onChange({ domkey: c.domkey[0], value: v }, '', callback)}
                                    {...c.otherParams}
                                />,
                            )}
                    </div>
                </div>
                )
            } else if (type === types.CHECKBOXGROUP) {
                let initialValueTemp = [];
                initialValueTemp = typeof initialValue == 'string' ? initialValue.split(',') : initialValue
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValueTemp && c.options.map(op => {
                                    if (initialValueTemp.indexOf(op.value) > -1) {
                                        return op.label + " "
                                    } else {
                                        return ''
                                    }
                                })}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                valuePropName: 'defaultValue',
                                initialValue: initialValue ? initialValue : [],
                                rules: c.rules || [],
                            })(
                                <NewCheckboxGroup
                                    options={c.options}
                                    {...c.otherParams}
                                    onChange={(v) => onChange({ domkey: c.domkey[0], value: v }, '', callback)}
                                />,
                            )}
                    </div>
                </div>
                )
            } else if (type === types.RADIOGROUP) {
                console.log('radioGroup == ', initialValue)
                let initialValueTemp = [];
                initialValueTemp = typeof initialValue == 'string' ? initialValue.split(',') : initialValue
                if (typeof initialValue == 'number') {
                    initialValue = initialValue.toString()
                }
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValueTemp && c.options.map(op => {
                                    if (initialValueTemp.indexOf(op.value) > -1) {
                                        return op.label + " "
                                    } else {
                                        return ''
                                    }
                                })}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                // valuePropName: 'defaultValue',
                                initialValue: initialValue ? initialValue : 0,
                                rules: c.rules || [],
                            })(
                                <NewRadioGroup
                                    options={c.options}
                                    {...c.otherParams}
                                    onChange={(v) => onChange({ domkey: c.domkey[0], value: v }, '', callback)}
                                />,
                            )}
                    </div>
                </div>
                )
            } else if (type === types.SELECT) {
                let initialValueTemp = [];
                initialValueTemp = typeof initialValue == 'string' ? initialValue.split(',') : initialValue
                if (initialValue && typeof initialValue == 'number') {
                    initialValue = initialValue + ''
                }
                //判断当前初始值是否存在于option内，不存在强制置为空

                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {
                        c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {c.options.map(op => {
                                    if (initialValueTemp && initialValueTemp.indexOf(op.key) > -1) {
                                        return op.showname + " "
                                    } else {
                                        return ''
                                    }
                                })}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                rules: c.rules || [],
                                initialValue: initialValue
                            })(
                                <NewSelect
                                    allowClear={true}
                                    mode={c.multiple ? "multiple" : 'tag'}
                                    dropdownMatchSelectWidth={true}
                                    placeholder={c.placeholder}
                                    {...c.otherParams}
                                    onChange={(v, _option) => onChange({ domkey: c.domkey[0], value: v }, _option, callback)}
                                    options={c.options}
                                >
                                </NewSelect>,
                            )}
                    </div>

                </div>
                )
            } else if (type === types.DATEPICKER) {
                if (!initialValue || initialValue == '') {
                    initialValue = moment().format(c.format || 'YYYY-MM-DD')
                }
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValue}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                rules: c.rules || [],
                                initialValue: initialValue
                            })(
                                <NewDatePicker
                                    allowClear={true}
                                    placeholder={c.placeholder}
                                    size={'default'}
                                    showTime={true}
                                    showToday={true}
                                    format={c.format || 'YYYY-MM-DD'}
                                    {...c.otherParams}
                                    onChange={(v) => onChange({ domkey: c.domkey[0], value: v }, '', callback)}
                                />
                            )
                        }
                    </div>
                </div>
                )
            } else if (type === types.TIMEPICKER) {
                initialValue = c.viewAttr == 1 ? initialValue : initialValue ? moment(initialValue) : moment()
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValue}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                rules: c.rules || [],
                                initialValue: initialValue
                            })(
                                <TimePicker
                                    allowClear={true}
                                    placeholder={c.placeholder}
                                    size={'default'}
                                    showTime={true}
                                    showToday={true}
                                    {...c.otherParams}
                                    onChange={(v, dateString) => onChange({ domkey: c.domkey[0], value: v }, dateString, callback)}
                                />
                            )}
                    </div>
                </div>
                )
            } else if (type === types.RANGEPICKER) {
                return (<div>
                    {getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        initialValue: initialValue
                    })(
                        <RangePicker
                            allowClear={true}
                            placeholder={c.placeholder}
                            size={'default'}
                            showTime={true}
                            showToday={true}
                            {...c.otherParams}
                            onChange={(v, dateString) => onChange({ domkey: c.domkey[0], value: v }, dateString, callback)}
                        />
                    )}
                </div>
                )
            } else if (type === types.MONTHPICKER) {
                initialValue = c.viewAttr == 1 ? initialValue : initialValue ? moment(initialValue) : moment()
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValue}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                rules: c.rules || [],
                                initialValue: initialValue
                            })(
                                <RangePicker
                                    allowClear={true}
                                    placeholder={c.placeholder}
                                    size={'default'}
                                    showTime={true}
                                    showToday={true}
                                    {...c.otherParams}
                                    onChange={(v, dateString) => onChange({ domkey: c.domkey[0], value: v }, dateString, callback)}
                                />
                            )}
                    </div>
                </div>
                )
            } else if (type === types.DATE) {

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
                                allowClear={true}
                                dropdownMatchSelectWidth={true}
                                placeholder={c.placeholder}
                                {...c.otherParams}
                                onChange={(v, option) => onChange({ domkey: c.domkey[0], value: v }, option, callback)}
                            >
                                {datas.map(op => {
                                    return <Option key={op.value} value={op.value}>{op.name}</Option>
                                })}
                            </Select>,

                        )}
                        {
                            values[c.domkey[0]] == '6' ? <div>
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
                                        onChange={(v, dateString) => onChange({ domkey: c.domkey[0], value: v }, dateString, callback)}
                                    />
                                )}
                            </div> : ''
                        }
                    </div>
                )
            } else if (type === types.TEXTAREA) {
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValue}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                rules: c.rules || [],
                                initialValue: initialValue
                            })(
                                <TextArea
                                    size="default"
                                    placeholder={c.placeholder}
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                    visibilityToggle={true}
                                    {...c.otherParams}
                                    onChange={(v) => onChange({ domkey: c.domkey[0], value: v.target.value }, '', callback)}
                                />,
                            )}
                    </div>
                </div>
                )
            } else if (type === types.INPUTNUMBER) {
                if (!parseInt(initialValue, 10)) {
                    initialValue = 0;
                }
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValue}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                rules: c.rules || [],
                                initialValue: initialValue ? parseInt(initialValue, 10) : 0
                            })(
                                <InputNumber
                                    size="default"
                                    placeholder={c.placeholder}
                                    {...c.otherParams}
                                    onChange={(v) => onChange({ domkey: c.domkey[0], value: v }, '', callback)}
                                />,
                            )}
                    </div>
                </div>
                )
            } else if (type === types.UPLOAD) {
                const uploadButton = (
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  );
                return (<div>
                    {getFieldDecorator(`${c.domkey[0]}`, {
                        rules: c.rules || [],
                        valuePropName: 'value',
                        initialValue: initialValue
                    })(
                        <NewUpload
                            {...c.otherParams}
                            onChange={(v) => onChange({ domkey: c.domkey[0], value: v }, '', callback)}
                        >
                        {uploadButton}
                        </NewUpload>,
                    )}
                </div>
                )
            } else if (type === types.SWITCH) {
                if (!initialValue || initialValue == '') {
                    initialValue = '0';
                }
                return (<div className={'wea-form-item clearfix underline'} key={c.domkey[0]}>
                    {c.viewAttr == 1 &&
                        <div className="wea-form-item-wrapper" style={{ display: 'table' }}>
                            <span className="wea-field-readonly">
                                {initialValue == '1' ? '是' : '否'}
                            </span>
                        </div>
                    }

                    <div style={{ display: c.viewAttr == 1 ? 'none' : '' }}>
                        {
                            getFieldDecorator(`${c.domkey[0]}`, {
                                initialValue: initialValue,
                                rules: c.rules || [],
                            })(
                                <NewSwitch
                                    onChange={(v) => onChange({ domkey: c.domkey[0], value: v }, '', callback)}
                                    {...c.otherParams}
                                />,
                            )}
                    </div>
                </div>
                )
            }

        }
        return <Input />
    },
}


export default formSwitch;