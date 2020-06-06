import { Table, Input, Button, Popconfirm, Form ,Row ,Col} from 'antd';
import Switch from "../Switch";
import EditableContext from "./EdittableContext"

class EditableCell extends React.Component {

  componentDidMount() {
    // console.log('cell:',this.props)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('cell nextProps:',nextProps)
  }

  save = e => {
    const { record, handleSave } = this.props;
    const values = this.form.getFieldsValue();
    handleSave({ ...record, ...values });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title,fieldconfig,setformlist } = this.props;
    
    setformlist(record.key,this.form)
    return (
      <Form.Item style={{ margin: 0 }}>
        {/* <Switch form={form} fieldConfig = {fieldconfig} initialValue= {record[dataIndex]} onChange={(e)=>this.save(e)}/> */}
        {Switch.renderComs(form,fieldconfig,this.save,record[dataIndex])}
      </Form.Item>
    ) 
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export default EditableCell;