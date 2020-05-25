import { Table, Input, Button, Popconfirm, Form ,Row ,Col} from 'antd';
import Switch from "../Switch";
import EditableContext from "./EdittableContext"
import EditableFormRow from "./EditableFormRow"
import EditableCell from "./EditableCell"

const formList = {}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: '',
      selectedData: [],
      datas: [
      ],
      columns : [
      ],
      count: 2,
    };
  }

  componentDidMount() {
    const { datas, columns,  selectedData } = this.props;
    let newState = {};
    if (datas !== undefined && datas.length === 0) {
      newState.datas = [{}];
    }
    if (columns !== undefined && datas !== undefined && columns.length > 0) {
      newState = {
        ...newState,
        datas:datas,
        columns :columns,
      };
    }
    this.setState(newState)
  }

  componentWillReceiveProps(nextProps) {
    const { datas, columns,  selectedData } = nextProps;
    let newState = {};
    if (datas !== undefined && datas.length === 0) {
      newState.datas = [{}];
    }
    if (columns !== undefined && datas !== undefined && columns.length > 0) {
      newState = {
        ...newState,
        datas:datas,
        columns:columns,
      };
    }
    this.setState({newState})
  }

  onChange(_key,datas) {
    const { columns, selectedData } = this.state;
    const { onChange } = this.props;
    let _datas = [...datas];
    
    
    typeof onChange === "function" && onChange(_datas, columns, selectedData);
  }

  setFormList = (_key,form)=>{
    form&&_key?formList[_key] = form:'';
  }

  getEditTable = ()=>{
    let newDate = [];
    formList&&Object.keys(formList).forEach((_key,index)=>{
      const fieldValues = formList[_key].getFieldsValue();
      newDate.push({...fieldValues})
    })
    return newDate;
  }

  validateFields = ()=>{
    let canPass = true;
    formList&&Object.keys(formList).forEach((_key,index)=>{
      formList[_key].validateFields((error, values) => {
        if (error) {
          canPass = false;
        }
      });
    })
    return canPass;
  }

  

  handleDelete = () => {
    const { selectedRowKeys } = this.state;
    const datas = [...this.state.datas];
    this.setState({ datas: datas.filter(item => selectedRowKeys.indexOf(item.key) < 0 ) });
    selectedRowKeys.forEach((_rowKey)=>{
      delete formList[_rowKey]
    })
  };

  handleAdd = () => {
    const { count, datas,columns } = this.state;
    const newData = {
      key: count,
    };
    columns.forEach((_c)=>{
      _c.cell&&Object.keys(_c.cell).forEach((_k)=>{
        //预留 设置新加时候的初始值
        // if(cell.conditionType=='INPUT'){
        //   newData[cell.domkey[0]]=''
        // }else if(cell.conditionType=='SELECT'){
        //   newData[cell.domkey[0]]=''
        // }else if(cell.conditionType=='CHECKBOX'){
        //   newData[cell.domkey[0]]=''
        // }else if(cell.conditionType=='DATEPICK'){
        //   newData[cell.domkey[0]]=''
        // }else if(cell.conditionType=='INPUT'){
        //   newData[cell.domkey[0]]=''
        // }else if(cell.conditionType=='INPUT'){
        //   newData[cell.domkey[0]]=''
        // }else if(cell.conditionType=='INPUT'){
        //   newData[cell.domkey[0]]=''
        // }
        if(_k == 'domkey'){
          newData[_c.cell[_k][0]]=''
        }
        
      })
    })
    this.setState({
      datas: [...datas, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.datas];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ datas: newData });
    this.onChange(row.key,newData)
  };

  getRowSelection = () => {
    const { onRowSelect, getRowSelection } = this.props;
    const { columns, selectedRowKeys } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: (sRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys: sRowKeys });
        typeof onRowSelect === "function" &&
          onRowSelect(sRowKeys, selectedRows);
      }
    };
    if (typeof getRowSelection === "function") {
      rowSelection = getRowSelection(rowSelection);
    }
    return rowSelection;
  }
  

  render() {
    const { datas, columns} = this.state;
    const components = {
      body: {
        // row: ()=> {return <EditableFormRow />},
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columnsRender = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          fieldconfig:col.cell,
          setformlist:this.setFormList
        })
      };
    });
    return (
      <div className="wea-table-edit">
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
          <Row className="wea-table-edit-body">
            <Col>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={datas}
              columns={columnsRender}
              pagination={false}
              rowSelection={this.getRowSelection()}
            />
            </Col>
        </Row>
      </div>
    )
    
  }
}

export default EditableTable;