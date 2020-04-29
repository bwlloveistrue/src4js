import React from "react";
import { Select } from 'antd';
import { select } from "d3-selection";
const { Option } = Select;

class NewSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          newV:this.props.value || ''
        };
      }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        let _v = nextProps.value;
        const v = (typeof _v == 'object'?_v.join(','):typeof _v == 'string'?_v:_v)
        const {newV} = this.state;
        if(v != newV){
            this.setState({newV:v})
        }
    }

    onChange = (v)=>{
        v = (typeof v == 'object'?v.join(','):typeof v == 'string'?v:v)
        this.setState({newV:v})
        const {onChange} = this.props
        onChange&&onChange(v)
    }

    render(){
        const {newV} = this.state;
        const {options,mode,...restProps} = this.props
        let selectV;
        console.log('newV==',newV)
        if(mode == 'multiple'){
            selectV = newV?newV.split(','):[]
        }else{
            selectV = newV
        }
        return (
            <Select
                {...restProps}
                mode={mode}
                value={selectV}
                onChange={(v)=>this.onChange(v)}
                // onBlur={(v)=>{this.onChange(v)}}
                >
                {options.map(op=>{
                    return <Option key={op.key} value={op.key}>{op.showname}</Option>
                })}
            </Select>
        );
    }
}

export default NewSelect