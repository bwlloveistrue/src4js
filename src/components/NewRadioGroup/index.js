import React from "react";
import { Radio } from 'antd';

class NewRadioGroup extends React.Component {
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

    onChange = (e)=>{
        let v = e.target.value
        const newV = {newV:v}
        this.setState({...newV})
        const {onChange} = this.props
        onChange&&onChange(v)
    }

    render(){
        console.log(this.props)
        const {newV} = this.state;
        return (
            <Radio.Group 
                defaultValue={newV}
                {...this.props}
                onChange={(e)=>this.onChange(e)}
                >
            </Radio.Group >
        );
    }
}

export default NewRadioGroup