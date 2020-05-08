import { Table, Input, Button, Form ,Row ,Col} from 'antd';
import Switch from "../Switch";
import NewCheckbox from "../NewCheckbox/index";
import InitForm from "./initForm";
import Tools from "../Tools/index";
import { select } from 'd3-selection';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormKey:[],
      formRefKeys:{},
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
    const formRefKeys = {};
    initDatas&&initDatas.forEach((datas)=>{
      const hashcode = Tools.gethashcode();
      formRefKeys[hashcode] = hashcode;
      // formRefKeys.push(Tools.gethashcode())
    })
    this.setState({formRefKeys,formRefKeys})
  }

  handleAdd = ()=>{
    const { formRefKeys } = this.state;
    let formRefKeysTemp = {...formRefKeys};
    
    const hashcode = Tools.gethashcode();
    formRefKeysTemp[hashcode] = hashcode;
    this.setState({formRefKeys:formRefKeysTemp})
    this.props.resetHeight&&this.props.resetHeight();
  }

  setSelectedFormKey = (v,type)=>{
    const {selectedFormKey} = this.state
    let [...selectedFormKeyTemp] = selectedFormKey;
    if(type=='1'){
      selectedFormKeyTemp.push(v)
    }else{
      delete selectedFormKeyTemp[v]
    }
    console.log(selectedFormKeyTemp)
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
          Object.keys(formRefKeys).map((_k,index)=>{
            return (
              <Row className={'editFormRow'} key={_k}>
                <Col span={1} style={{...checkBoxStyle}}>
                <NewCheckbox
                  onChange={(v)=>this.setSelectedFormKey(_k,v)}
                />
                </Col>
                <Col span={23} ref={'formCellRef'} className={'editFormCell'}>
                    <InitForm datas={initFormFields} initDatas={initDatas[index]} ref={(form=>{
                      formRefKeys[_k] = form;
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