import React from "react";
import { Checkbox } from 'antd';

class NewCheckbox extends React.Component {
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
        const _v = e.target.checked;
        let v = _v == true?1:0
        this.setState({newV:v})
        const {onChange} = this.props
        onChange&&onChange(v)
    }

    render(){
        const {newV} = this.state;
        let checkedStatus = ( newV === 1 || newV === "1")?true:false
        return (
            <Checkbox
                defaultChecked={checkedStatus}
                {...this.porps}
                onChange={(e)=>this.onChange(e)}
                >
            </Checkbox>
        );
    }
}

export default NewCheckbox