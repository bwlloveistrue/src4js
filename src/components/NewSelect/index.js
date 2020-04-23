import React from "react";
import { Select } from 'antd';
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
        const {newV} = this.state;
        if(nextProps.value != newV){
            this.setState({newV:nextProps.value})
        }
    }

    onChange = (v)=>{
        v = (typeof v == 'object'?v.join(','):typeof v == 'string'?v:v)
        console.log('v==',v)
        this.setState({newV:v})
        const {onChange} = this.props
        onChange&&onChange(v)
    }

    render(){
        const {newV} = this.state;
        const {options,mode,...restProps} = this.props
        console.log('restProps==',restProps)
        let selectV;
        if(mode == 'multiple'){
            console.log('newV==',newV)
            selectV = newV?newV.split(','):[]
        }else{
            selectV = newV
        }
        console.log('selectV',selectV)
        return (
            <Select
                {...restProps}
                mode={mode}
                value={selectV}
                // onChange={(v)=>this.onChange(v)}
                onBlur={(v1,v2,v3)=>{this.onChange(v)}}
                >
                {options.map(op=>{
                    return <Option key={op.key} value={op.key}>{op.showname}</Option>
                })}
            </Select>
        );
    }
}

export default NewSelect