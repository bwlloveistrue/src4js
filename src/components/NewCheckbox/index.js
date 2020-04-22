import React from "react";
import { Checkbox } from 'antd';

class NewCheckbox extends React.Component {

    render(){
        let status = false;
        if (this.props.value === true || this.props.value === 'true' || this.props.value === 1 || this.props.value === "1" ) status=true;
        return (
            <Checkbox
                checked={status}
                onChange={(e)=>this.porps.onChange(e)}
                {...this.porps}
                >
            </Checkbox>
        );
    }
}

export default NewCheckbox