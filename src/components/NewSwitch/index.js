import React from "react";
import { Switch } from 'antd';

class NewSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          newV:this.props.value || 0
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
        const _v = e;
        let v = _v == true?1:0
        this.setState({newV:v})
        const {onChange} = this.props
        onChange&&onChange(v)
    }

    render(){
        const {newV} = this.state;
        let checkedStatus = ( newV === 1 || newV === "1")?true:false
        return (
            <Switch 
                defaultChecked={checkedStatus}
                {...this.props}
                onChange={(e)=>this.onChange(e)}
                >
            </Switch >
        );
    }
}

export default NewSwitch