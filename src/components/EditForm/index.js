import { Table, Input, Button, Form ,Row ,Col} from 'antd';
import Switch from "../Switch";
import NewCheckbox from "../NewCheckbox/index";
import InitForm from "./initForm";
import Tools from "../Tools/index";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormKey:'',
      formRefKeys:[],
    };
  }

  componentDidMount() {
    this.updateFormRefKeys(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { initFormFields ,initDatas } = nextProps
    this.updateFormRefKeys(nextProps);
  }

  updateFormRefKeys = (props)=>{
    const { initFormFields ,initDatas } = props
    const formRefKeys = [];
    initDatas&&initDatas.forEach((datas)=>{
      formRefKeys.push(Tools.gethashcode())
    })
    this.setState({formRefKeys,formRefKeys})
  }

  handleAdd = ()=>{
    const { formRefKeys } = this.state;
    let [...formRefKeysTemp] = formRefKeys;
    formRefKeysTemp.push(Tools.gethashcode());
    this.setState({formRefKeys:formRefKeysTemp})
  }

  render(){
    const {initFormFields,initDatas} = this.props
    const checkBoxStyle={
      lineHeight:'102px',
      textAlign:'center'
    }
    
    const { formRefKeys } = this.state;
    console.log('editform render',formRefKeys)
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
        {
          formRefKeys.map((_k,index)=>{
            return (
              <Row className={'editFormRow'} key={_k}>
                <Col span={1} style={{...checkBoxStyle}}>
                <NewCheckbox
                  onChange={(v)=>console.log(v)}
                />
                </Col>
                <Col span={23} ref={'formCellRef'} className={'editFormCell'}>
                    <InitForm datas={initFormFields} initDatas={initDatas[index]} ref={(form=>{
                      _k = form;
                    })}/>
                </Col>
              </Row>
            )
          })
        }
        
        {/* <Row>
          <Col span={1} style={{...checkBoxStyle}}>
          <NewCheckbox
            onChange={(v)=>console.log(v)}
          />
          </Col>
          <Col span={23} ref={'formCellRef'}>
              <InitForm datas={datas} />
          </Col>
        </Row>
        <Row>
          <Col span={1} style={{...checkBoxStyle}}>
          <NewCheckbox
            onChange={(v)=>console.log(v)}
          />
          </Col>
          <Col span={23} ref={'formCellRef'}>
              <InitForm datas={datas} />
          </Col>
        </Row> */}
      </div>
    )
  }
}

export default EditForm;