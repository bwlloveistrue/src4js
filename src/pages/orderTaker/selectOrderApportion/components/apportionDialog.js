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
        this.state = {
            visible: false,
            dialogHeight: 700,
            editFormHeight: 0,
            apportionId: ''

        }
    }

    static defaultProps = {

    };

    static defaultStates = {

    }


    selectForm = undefined;

    componentDidMount() {
        const { apportionId } = this.props
        this.onDispatch(apportionId)
    }

    componentWillReceiveProps(nextProps) {
        const { dialogHeight, visible } = this.state
        const {type , apportionId } = this.props
        const baseInfoHeight = $(this.refs.formDivRef).height()
        const editFormHeight = dialogHeight - baseInfoHeight;
        this.setState({ editFormHeight: editFormHeight })
        if(nextProps.visible != visible && nextProps.visible){
            this.setState({visible:nextProps.visible,apportionId:apportionId})
        }else if(!nextProps.visible){
            this.setState({visible:nextProps.visible})
        }
    }

    onDispatch = (key = '') => {
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
        let buttonsCreate = [
            <Button key="doEdit" type="primary" disabled={false} onClick={this.onSave}>{'保存'}</Button>,
        ]

        return buttonsCreate;
    }

    onSave = () => {
        const { dispatch } = this.props;
        const { apportionId } = this.state;
        this.selectForm.validateFields((errors, values) => {
            if (errors) {
                console.log(errors)
            }
        });
        const values = this.selectForm.getFieldsValue();
        const isPass = this.refs.editFormRef.onFormsValidateFields();
        if(isPass){
            const type = 'selectOrderApportion/update';
            const orderTakerInfo = this.refs.editFormRef.getFormsValues();
            dispatch({
                type: type,
                payload: {
                    // orderTakerInfo:JSON.stringify(orderTakerInfo),
                    mainInfo: JSON.stringify(values)
                },
    
            });
        }
    }

    onlyClose = () => {
        this.setState({ visible: false });
        this.props.onCloseBack && this.props.onCloseBack();
    }

    render() {
        const { from, loading, selectOrderApportion } = this.props;
        const { showSearchAd, timeSag, selectedRows, visible, dialogHeight, editFormHeight } = this.state;
        console.log('editFormHeight',editFormHeight)
        const { data, columns, infoFields, initFormFields, initDatas } = selectOrderApportion;
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
                        </NewForm>
                    </div>
                    <NewScroll height={editFormHeight}>
                        <EditForm initFormFields={initFormFields} initDatas={initDatas} ref={'editFormRef'}/>
                    </NewScroll>
                </NewDialog>
            </div>
        );
    }
}

export default Form.create()(ApportionDialog);
