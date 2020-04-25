import React from "react";
import { Checkbox } from 'antd';

class NewCheckboxGroup extends React.Component {
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

    onChange = (checkedV)=>{
        let v = checkedV.join(',')
        this.setState({newV:v})
        const {onChange} = this.props
        onChange&&onChange(v)
    }

    render(){
        const {newV} = this.state;
        let selectV = newV?newV.split(','):[]
        return (
            <Checkbox.Group 
                defaultValue={selectV}
                {...this.props}
                onChange={(e)=>this.onChange(e)}
                >
            </Checkbox.Group >
        );
    }
}

export default NewCheckboxGroup