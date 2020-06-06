import { Table, Input, Button, Form, Row, Col } from 'antd';
import Switch from "../Switch";
import NewCheckbox from "../NewCheckbox/index";
import InitForm from "./initForm";
import Tools from "../Tools/index";
import { select } from 'd3-selection';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormKey: [],
      formRefKeys: {},
    };
  }

  componentDidMount() {
    this.updateFormRefKeys(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { initFormFields, initDatas } = nextProps
    this.updateFormRefKeys(nextProps);
  }

  updateFormRefKeys = (props) => {
    const { initFormFields, initDatas } = props
    const formRefKeys = {};
    initDatas && initDatas.forEach((datas) => {
      const hashcode = Tools.gethashcode();
      formRefKeys[datas.id] = hashcode;
    })
    this.setState({ formRefKeys, formRefKeys })
  }

  handleDelete = () => {
    const { selectedFormKey, formRefKeys } = this.state
    let formRefKeysTemp = { ...formRefKeys }
    if (selectedFormKey.length > 0) {
      selectedFormKey.forEach(_k => {
        delete formRefKeysTemp[_k]
      })
    }
    this.setState({ formRefKeys: formRefKeysTemp, selectedFormKey: [] })
  }

  handleAdd = () => {
    const { formRefKeys } = this.state;
    let formRefKeysTemp = { ...formRefKeys };
    const hashcode = Tools.gethashcode();
    formRefKeysTemp[hashcode] = hashcode;
    this.setState({ formRefKeys: formRefKeysTemp })
    this.props.resetHeight && this.props.resetHeight();
  }

  setSelectedFormKey = (v, type) => {
    const { selectedFormKey } = this.state
    let [...selectedFormKeyTemp] = selectedFormKey;

    if (type == '1') {
      selectedFormKeyTemp.push(v)
    } else {
      selectedFormKeyTemp = selectedFormKeyTemp.filter((item) => item != v)
    }
    this.setState({ selectedFormKey: selectedFormKeyTemp })
  }

  getFormsValues = () => {
    const { formRefKeys } = this.state
    return Object.keys(formRefKeys).map(_k => {
      let formValues = formRefKeys[_k].getFieldsValue();
      formValues = {...formValues,id:_k}
      return formValues;
    })
  }

  onFormsValidateFields = () => {
    const { formRefKeys } = this.state
    let pass = true;
    Object.keys(formRefKeys).forEach(_k => {
      formRefKeys[_k].validateFields((errors, values) => {
        if (errors) {
          pass = false;
        }
      });
    })
    return pass;
  }

  render() {
    const { initFormFields, initDatas } = this.props
    const checkBoxStyle = {
      lineHeight: '102px',
      textAlign: 'center'
    }

    const { formRefKeys } = this.state;
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
                float: 'right',
              }}
            >
              <Button
                style={{ display: "block" }}
                type="primary"
                disabled={false}
                title={"添加"}
                size="small"
                onClick={this.handleAdd}
              >
                <span className="icon-coms-Add-to-hot" />
              </Button>
              <Button
                style={{ display: "block" }}
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
          Object.keys(formRefKeys).map((_k, index) => {
            return (
              <Row className={'editFormRow'} key={_k}>
                <Col span={1} style={{ ...checkBoxStyle }}>
                  <NewCheckbox
                    onChange={(v) => this.setSelectedFormKey(_k, v)}
                  />
                </Col>
                <Col span={23} ref={'formCellRef'} className={'editFormCell'}>
                  <InitForm datas={initFormFields} initDatas={initDatas[index]} ref={(form => {
                    formRefKeys[_k] = form;
                  })} />
                </Col>
              </Row>
            )
          })
        }
      </div>
    )
  }
}

export default EditForm;