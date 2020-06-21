import { Button, Form, Input, Card } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import NewForm from '@/components/FormComponents';
import SearchGroup from '@/components/SearchGroup';
import SearchTab from '@/components/SearchTab';
import PageTop from '@/components/PageTop';
import Switch from '@/components/Switch/index';
import NewTable from '@/components/NewTable';
import NewDialog from '@/components/NewDialog';
import TableEdit from '@/components/TableEdit';
import NewScroll from '@/components/NewScroll';
import EditForm from '@/components/EditForm';
import $ from 'jquery'

const FormItem = Form.Item;

@connect(({ selectOrderReceipt, loading }) => ({
    selectOrderReceipt,
    loading: loading.effects['selectOrderReceipt/getOrderReceiptDispatch'],
}))
class ReceiptDialog extends Component {

    state = {
        selectedRows: [],
    }

    constructor() {
        super();
        //设置sate,添加name与age属性
        this.state = {
            visible: false,
            dialogHeight: 700,
            receiptId: ''

        }
    }

    static defaultProps = {

    };

    static defaultStates = {

    }


    selectForm = undefined;

    componentDidMount() {
        const { receiptId } = this.props
        this.onDispatch(receiptId)
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = this.state
        const { receiptId } = this.props
        if (nextProps.visible != visible) {
            this.setState({ visible: nextProps.visible, receiptId: receiptId })
        }
    }

    onDispatch = (key = '') => {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectOrderReceipt/getOrderReceiptDispatch',
            payload: {
                id: key
            },
        });
        this.setState({ visible: true, selectedKey: key })
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectOrderReceipt/initForm',
        });
        this.selectForm = undefined;
     }


    getButton = () => {
        let buttonsCreate = [
            <Button key="doEdit" type="primary" disabled={false} onClick={this.onSave}>{'保存'}</Button>,
        ]

        return buttonsCreate;
    }

    onSave = () => {
        const { dispatch,selectOrderReceipt } = this.props;
        const { receiptId } = this.state;
        const { receiptDetailIds } = selectOrderReceipt;
        const _that = this;
        this.selectForm.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log(errors)
            } else {
                const type = 'selectOrderReceipt/update';
                let orderReceiptInfo = _that.selectForm.props.form.getFieldsValue();
                // 特殊处理上传控件payAccessory，signAccessory，checkOutAccessory
                if(orderReceiptInfo.payAccessory && Array.isArray(orderReceiptInfo.payAccessory)){
                    const payAccessory = orderReceiptInfo.payAccessory.map(_item=>{
                        return _item.response.uid
                    })
                    orderReceiptInfo = {...orderReceiptInfo,payAccessory:payAccessory.join(',')}
                }
                if(orderReceiptInfo.signAccessory && Array.isArray(orderReceiptInfo.signAccessory)){
                    const signAccessory = orderReceiptInfo.signAccessory.map(_item=>{
                        return _item.response.uid
                    })
                    orderReceiptInfo = {...orderReceiptInfo,signAccessory:signAccessory.join(',')}
                }
                if(orderReceiptInfo.checkOutAccessory && Array.isArray(orderReceiptInfo.checkOutAccessory)){
                    const checkOutAccessory = orderReceiptInfo.checkOutAccessory.map(_item=>{
                        return _item.response.uid
                    })
                    orderReceiptInfo = {...orderReceiptInfo,checkOutAccessory:checkOutAccessory.join(',')}
                }
                dispatch({
                    type: type,
                    payload: {
                        id: receiptId,
                        mainInfo: JSON.stringify(orderReceiptInfo),
                        receiptDetailIds: receiptDetailIds.join(',')
                    },
                    callback:()=>{this.onlyClose()}
                });
            }
        });
    }

    

    onlyClose = () => {
        this.setState({ visible: false });
        this.props.onCloseBack && this.props.onCloseBack();
    }

    onValuesChange = (value,formValues)=>{
        const { selectOrderReceipt } = this.props;
        const { receiptDetailIds,feeTypes } = selectOrderReceipt;
        let domkey = '';
        for(const domkeyTemp in value){
            domkey = domkeyTemp;
        }
        let needSumProfit = false;
        if(feeTypes.indexOf(domkey) > -1){
            needSumProfit = true;
        }
        if(!needSumProfit){
            for(let i in receiptDetailIds){
                if(domkey==`realCarry_${receiptDetailIds[i]}`){
                    needSumProfit = true;
                    break;
                }
                if(domkey==`price_${receiptDetailIds[i]}`){
                    needSumProfit = true;
                    break;
                }
            }
        }
        if(!needSumProfit && (domkey=='lifitingCost' || domkey=='processingFee')){
            needSumProfit = true;
        }
        if(needSumProfit){
            let expensens = 0;
            let cost = 0;
            let profit = 0;
            if(formValues.packageFlg == 1){//包车情况下，不计算单价*重量，直接以包车总价为运费总数
                expensens = formValues.packagePrice;
    
            }else{//非包车情况下，计算明细中所有的单价*重量
                for(let i in receiptDetailIds){
                    expensens += (formValues[`realCarry_${receiptDetailIds[i]}`] * formValues[`price_${receiptDetailIds[i]}`] )
                }
            }
            feeTypes&&feeTypes.forEach(_v=>{
                cost += formValues[_v]
            })
            if(formValues['lifitingCost']){
                cost +=formValues['lifitingCost']
            }
            if(formValues['processingFee']){
                cost +=formValues['processingFee']
            }
            
            profit = expensens - cost;
            // console.log(this.selectForm)
            this.selectForm.props.form.setFieldsValue({
                expensens: Math.round(expensens*100)/100,//保留两位小数
                cost: Math.round(cost*100)/100,//保留两位小数
                profit: Math.round(profit*100)/100,//保留两位小数
              });
        }
        
        
    }

    onChange = (value)=>{
        // const { selectOrderReceipt } = this.props;
        // const { detailRow,feeTypes } = selectOrderReceipt;
        // console.log(value)
        // const formValues = this.selectForm.props.form.getFieldsValue();
        // console.log('formValues',formValues)
        // const domkey = value.domkey;
        
        // let needSumProfit = false;
        // if(feeTypes.indexOf(domkey) > -1){
        //     needSumProfit = true;
        // }
        // if(!needSumProfit){
        //     for(let i=0;i<detailRow;i++){
        //         if(domkey==`realCarry_${i}`){
        //             needSumProfit = true;
        //             break;
        //         }
        //         if(domkey==`price_${i}`){
        //             needSumProfit = true;
        //             break;
        //         }
        //     }
        // }
        // if(needSumProfit){
        //     let expensens = 0;
        //     let cost = 0;
        //     let profit = 0;
        //     if(formValues.packageFlg == 1){//包车情况下，不计算单价*重量，直接以包车总价为运费总数
        //         expensens = formValues.packagePrice;
    
        //     }else{//非包车情况下，计算明细中所有的单价*重量
        //         for(let i=0;i<detailRow;i++){
        //             expensens += (formValues[`realCarry_${i}`] * formValues[`price_${i}`] )
        //         }
        //     }
        //     feeTypes&&feeTypes.forEach(_v=>{
        //         cost += formValues[_v]
        //     })
        //     profit = expensens - cost;
        //     // console.log(this.selectForm)
        //     this.selectForm.props.form.setFieldsValue({
        //         expensens: expensens,
        //         cost: cost,
        //         profit: profit,
        //       });
        //     console.log('expensens=',expensens)
        //     console.log('cost=',cost)
        //     console.log('profit=',profit)
        // }
        
        
    }

    render() {
        const { loading, selectOrderReceipt } = this.props;
        const { showSearchAd, timeSag, selectedRows, visible, dialogHeight, editFormHeight } = this.state;
        const { data, columns, infoFields, initFormFields, initDatas } = selectOrderReceipt;
        return (
            <div>

                <NewDialog
                    ref='orderTakers_dialog'
                    visible={visible}
                    title={'订单回执'}
                    icon="icon-coms-meeting"
                    iconBgcolor="#f14a2d"
                    className="meetingDialog"
                    buttons={this.getButton()}
                    style={{ width: 'calc(100% - 200px)', height: dialogHeight }}
                    onCancel={() => this.onlyClose()}
                    scalable={true}
                >
                    <NewScroll height={dialogHeight}>
                        <div >
                            <NewForm
                                wrappedComponentRef={(form) => {
                                    this.selectForm = form;
                                }}
                                datas={infoFields}
                                col={6}
                                onChange={(v) => { this.onChange(v) }}
                                onValuesChange={(v,formValues) => { this.onValuesChange(v,formValues) }}
                            >
                            </NewForm>
                        </div>
                    </NewScroll>

                </NewDialog>
            </div>
        );
    }
}

export default Form.create()(ReceiptDialog);
