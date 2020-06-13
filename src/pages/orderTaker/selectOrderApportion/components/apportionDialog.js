import { Button, Form, Input, Card,Modal } from 'antd';
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
import styles from './style.less';

const FormItem = Form.Item;
const confirm = Modal.confirm
const warning = Modal.warning

@connect(({ selectOrderApportion, loading }) => ({
    selectOrderApportion,
    loading: loading.effects['selectOrderApportion/getOrderTakersApportion'],
}))
class ApportionDialog extends Component {

    state = {
        selectedRows: [],
    }

    constructor() {
        super();
        //设置sate,添加name与age属性
        this.instanceIsMounted = false;
        this.state = {
            visible: false,
            dialogHeight: 700,
            editFormHeight: 0,
            orderTakerId: '',
            orderStatus: 0,
            showAdd: true,
            showDelete: true,
            showSelect: true,
            showHead: true
        }
    }

    static defaultProps = {

    };

    static defaultStates = {

    }


    selectForm = undefined;

    componentDidMount() {
        const { orderTakerId,orderStatus } = this.props
        this.getOrderTakersApportion(orderTakerId)
        this.setState({ orderStatus: orderStatus,
            showAdd: false,
            showDelete: false,
            showSelect: false,
            showHead: true })
        // if(orderStatus == 1){
        //     this.setState({ orderStatus: orderStatus,
        //         showAdd: false,
        //         showDelete: false,
        //         showSelect: false,
        //         showHead: true })
        // }
        this.setState({ orderStatus: orderStatus })
        window.addEventListener("resize", this.onWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        const { dialogHeight, visible } = this.state
        const { type, orderTakerId, orderStatus} = this.props
        this.scrollheigth();
        if (nextProps.visible != visible && nextProps.visible) {
            this.setState({ visible: nextProps.visible, orderTakerId: orderTakerId,orderStatus:orderStatus })
        } else if (!nextProps.visible) {
            this.setState({ visible: nextProps.visible })
        }
    }

    componentWillUnmount() {
        // 防止节点卸载问题。。。
        window.removeEventListener("resize", this.onWindowResize);
        this.instanceIsMounted = false;
      }

    onWindowResize = () => {
        this.instanceIsMounted && this.scrollheigth();
    };

    scrollheigth = ()=>{
        const { dialogHeight } = this.state
        const baseInfoHeight = $(this.refs.formDivRef).height()
        const editFormHeight = dialogHeight - baseInfoHeight;
        this.setState({ editFormHeight: editFormHeight })
    }

    getOrderTakersApportion = (key = '') => {
        const { dispatch } = this.props;
        dispatch({
            type: 'selectOrderApportion/getOrderTakersApportion',
            payload: {
                id: key
            },
        });
        this.setState({ visible: true, selectedKey: key })
    }

    componentWillUnmount() { }


    getButton = () => {
        const { orderStatus } = this.state
        let buttonsCreate = [
            orderStatus!=1&&<Button key="doEdit" type="primary" disabled={false} onClick={this.onSave}>{'保存'}</Button>,
            orderStatus!=1&&<Button key="doDispatch" type="primary" disabled={false} onClick={this.onDispatch}>{'分配'}</Button>,
        ]

        return buttonsCreate;
    }

    onSave = () => {
        const { dispatch } = this.props;
        const { orderTakerId } = this.state;
        this.selectForm.validateFields((errors, values) => {
            if (errors) {
                console.log(errors)
            }
        });
        const values = this.selectForm.getFieldsValue();
        const isPass = this.refs.editFormRef.onFormsValidateFields();
        if (isPass) {
            const type = 'selectOrderApportion/saveOrderApportionInfo';
            const orderApportion = this.refs.editFormRef.getFormsValues();
            dispatch({
                type: type,
                payload: {
                    orderApportionInfo: JSON.stringify(orderApportion),
                    orderTakerId:orderTakerId
                },
                callback:()=>{this.onlyClose()}
            });
        }
    }

    onDispatch = ()=>{
        const { dispatch } = this.props;
        const { orderTakerId } = this.state;
        this.selectForm.validateFields((errors, values) => {
            if (errors) {
                console.log(errors)
            }
        });
        const values = this.selectForm.getFieldsValue();
        const isPass = this.refs.editFormRef.onFormsValidateFields();
        if (isPass) {
            const orderApportion = this.refs.editFormRef.getFormsValues();
            if(orderApportion.length > 0){
                const _that = this;
                confirm({
                    title: '系统提示',
                    content: '是否确认分配，分配后将不能修改！',
                    onOk(){
                        const type = 'selectOrderApportion/dispatchOrderApportionInfo';
                        dispatch({
                            type: type,
                            payload: {
                                orderApportionInfo: JSON.stringify(orderApportion),
                                orderTakerId:orderTakerId
                            },
                            callback:()=>{_that.onlyClose()}
                        });
                    },
                    onCancel(){},
                    width:'400px',
                    
                })
            }else{
                warning({
                    title: '系统提示',
                    content: '请添加分配货物！',
                })
            }
            
            
        }
    }

    onlyClose = () => {
        this.setState({ visible: false });
        this.props.onCloseBack && this.props.onCloseBack();
    }

    render() {
        const { from, loading, selectOrderApportion } = this.props;
        const { showSearchAd, timeSag, selectedRows, visible, dialogHeight, editFormHeight, showAdd, showDelete, showSelect, showHead } = this.state;
        const { data, columns, infoFields, initFormFields, initDatas, orderTakerInfoDetail, orderTakerInfoColumns } = selectOrderApportion;
        return (
            <div>
                <NewDialog
                    ref='orderTakers_dialog'
                    visible={visible}
                    title={'订单分配'}
                    icon="icon-coms-meeting"
                    iconBgcolor="#f14a2d"
                    className="meetingDialog"
                    buttons={this.getButton()}
                    style={{ width: 'calc(100% - 200px)', height: dialogHeight }}
                    onCancel={() => this.onlyClose()}
                    scalable={true}
                // onScale={() => this.onScale()}
                >
                    <div ref={'formDivRef'}>
                        <NewForm
                            ref={(form) => {
                                this.selectForm = form;
                            }}
                            datas={infoFields}
                            col={6}
                        >
                            <NewScroll>
                                {orderTakerInfoColumns.length > 0 && <SearchGroup
                                    needTigger={true}
                                    title={'货物信息'}
                                    showGroup={true}
                                    key={'goodsInfo'}
                                    onVisibleChange={this.scrollheigth}
                                >
                                    <TableEdit
                                        ref={(orderTakerRef) => { this.orderTakerRef = orderTakerRef }}
                                        datas={orderTakerInfoDetail}
                                        columns={orderTakerInfoColumns}
                                        showAdd={showAdd}
                                        showDelete={showDelete}
                                        showSelect={showSelect}
                                        showHead={showHead}
                                        className={styles.tableEditContent}
                                    />
                                </SearchGroup>}
                            </NewScroll>
                        </NewForm>
                    </div>
                    <NewScroll height={editFormHeight}>
                        <EditForm initFormFields={initFormFields} initDatas={initDatas} ref={'editFormRef'} />
                    </NewScroll>
                </NewDialog>
            </div>
        );
    }
}

export default Form.create()(ApportionDialog);
