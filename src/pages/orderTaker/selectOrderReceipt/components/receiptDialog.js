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
        this.setState({ apportionVisible: true, selectedKey: key })
    }

    componentWillUnmount() { }


    getButton = () => {
        let buttonsCreate = [
            <Button key="doEdit" type="primary" disabled={false} onClick={this.onSave}>{'保存'}</Button>,
        ]

        return buttonsCreate;
    }

    onSave = () => {
        const { dispatch } = this.props;
        const { receiptId } = this.state;
        this.selectForm.validateFields((errors, values) => {
            if (errors) {
                console.log(errors)
            } else {
                const type = 'selectOrderReceipt/update';
                const orderTakerInfo = this.refs.editFormRef.getFormsValues();
                console.log(orderTakerInfo)
                dispatch({
                    type: type,
                    payload: {
                        mainInfo: JSON.stringify(values)
                    },

                });
            }
        });
    }

    

    onlyClose = () => {
        this.setState({ visible: false });
        this.props.onCloseBack && this.props.onCloseBack();
    }

    onChange = (value,obj)=>{
        console.log(this)
        const formValues = this.selectForm.props.form.getFieldsValue();
        if(value.domkey=='realCarry_1'){
            this.selectForm.props.form.setFieldsValue({
                'profit':10000
            })
        }
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
                                onChange={(v,obj) => { this.onChange(v, obj) }}
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
