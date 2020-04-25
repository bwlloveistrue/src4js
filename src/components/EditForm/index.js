import { Table, Input, Button, Form ,Row ,Col} from 'antd';
import Switch from "../Switch";
import NewCheckbox from "../NewCheckbox/index";
import InitForm from "./initForm";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormKey:'',
      formList:[]
    };
  }

  componentDidMount() {
    console.log('editform didmount:',this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('editform willreceive:',nextProps)
  }

  handleAdd = ()=>{

  }

  render(){
    const datas={
      goodsType:{
        formItemType: 'SELECT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        options: [
          {
            disabled: false,
            key: '0',
            selected: true,
            showname: '货物类型1',
            visible: true,
          },
          {
            disabled: false,
            key: '1120',
            selected: false,
            showname: '货物类型2',
            visible: true,
          },
          {
            disabled: false,
            key: '1121',
            selected: false,
            showname: '货物类型3',
            visible: true,
          },
          {
            disabled: false,
            key: '1122',
            selected: false,
            showname: '货物类型4',
            visible: true,
          },
        ],
        conditionType: 'SELECT',
        rules: [{ required: true, message: '请填写客户' }],
        label: '货物类型',
        domkey: ['goodsType'],
        values:'0'
      },//货物类型
      truckPart:{
        formItemType: 'CHECKBOXGROUP',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        options: [
          { label: '个人', value: '0',disabled :false },
          { label: '伙伴', value: '1' ,disabled :false},
        ],
        conditionType: 'CHECKBOXGROUP',
        rules: [{ required: true, message: '请填写分配状态' }],
        label: '分配状态',
        domkey: ['truckPart'],
        values:'0'
      },//分配状态
      truckNumber:{
        formItemType: 'SELECT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        options: [
          {
            disabled: false,
            key: '1',
            selected: true,
            showname: '车牌号1',
            visible: true,
          },
          {
            disabled: false,
            key: '2',
            selected: false,
            showname: '车牌号2',
            visible: true,
          },
          {
            disabled: false,
            key: '3',
            selected: false,
            showname: '车牌号3',
            visible: true,
          },
          {
            disabled: false,
            key: '4',
            selected: false,
            showname: '车牌号4',
            visible: true,
          },
        ],
        conditionType: 'SELECT',
        rules: [{ required: true, message: '请填写货物类型' }],
        label: '货物类型',
        domkey: ['truckNumber'],
        values:'1'
      },//车牌号
      driver:{
        formItemType: 'SELECT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        options: [
          {
            disabled: false,
            key: '0',
            selected: true,
            showname: '司机1',
            visible: true,
          },
          {
            disabled: false,
            key: '1120',
            selected: false,
            showname: '司机2',
            visible: true,
          },
          {
            disabled: false,
            key: '1121',
            selected: false,
            showname: '司机3',
            visible: true,
          },
          {
            disabled: false,
            key: '1122',
            selected: false,
            showname: '司机4',
            visible: true,
          },
        ],
        conditionType: 'SELECT',
        rules: [{ required: true, message: '请填写客户' }],
        label: '司机',
        domkey: ['driver'],
        values:'0'
      },// 司机
      partner:{
        formItemType: 'INPUT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        domkey: ['partner'],
        conditionType: "INPUT",
        formItemType: "INPUT",
        rules: [{ required: true, message: '请填写伙伴' }],
        label: '伙伴',
      },//伙伴
      partnerCarry:{
        formItemType: 'INPUT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        domkey: ['partnerCarry'],
        conditionType: "INPUT",
        formItemType: "INPUT",
        rules: [{ required: true, message: '请填写重量' }],
        label: '重量',
      },//重量
      partnerPrice:{
        formItemType: 'INPUT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        domkey: ['partnerPrice'],
        conditionType: "INPUT",
        formItemType: "INPUT",
        rules: [{ required: true, message: '请填写单价' }],
        label: '单价',
      },//单价
    }
    return (
      <div>
        <Row className="wea-table-edit-title">
          <Col>
            <div
              className={`wea-drop-down-brn-select `}
              style={{
                display: "inline-block",
                paddingRight: 23,
                position: "relative",
                lineHeight: 1,
                float:'right',
              }}
            >
              <Button
                style={{ display:  "block" }}
                type="primary"
                disabled={false}
                title={"添加"}
                size="small"
                onClick={this.handleAdd}
              >
                <span className="icon-coms-Add-to-hot" />
              </Button>
              <Button
                style={{ display:  "block" }}
                type="primary"
                disabled={false}
                title={'删除'}
                size="small"
                onClick={this.handleDelete}
              >
                <span className="icon-coms-form-delete-hot" />
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={1}>
          <NewCheckbox
            onChange={(v)=>this.setFormList(v)}
          />
          </Col>
          <Col span={23}>
              <InitForm datas={datas}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditForm;