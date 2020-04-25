import EditableContext from "./EdittableContext"
import { Form } from 'antd';

class EditableFormRow extends React.Component {

  componentDidMount() {
    // console.log('row:',this.props)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('row nextProps:',nextProps)
  }

  render(){
    const {form, index, ...props} = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
     return ( 
      <EditableContext.Provider value={form}>
        <tr {...props} />        
      </EditableContext.Provider>
    );
  }

}

export default Form.create()(EditableFormRow);