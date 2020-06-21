import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class NewUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
    };
  }

  state = {
   
  };

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    const {onChange} = this.props
    onChange&&onChange(fileList)
  };

  render() {
    const {value,options,mode,...restProps} = this.props
    const { previewVisible, previewImage } = this.state;
    console.log(value)
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    console.log({...restProps})
    return (
      <div className="clearfix">
        <Upload
          {...restProps}
          fileList={value}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default NewUpload