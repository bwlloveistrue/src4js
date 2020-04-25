import React from "react";
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class NewDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          newV:this.props.value || '',
          format:this.props.format || 'YYYY-MM-DD'
        };
      }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        let _v = nextProps.value;
        const {newV} = this.state;
        if(_v != newV){
            this.setState({newV:_v})
        }
    }

    onChange = (date,dateString)=>{
      const {format} = this.state
      const v = date.format(format)
        this.setState({newV:v})
        const {onChange} = this.props
        onChange&&onChange(v)
    }

    render(){
        const {newV,format} = this.state;
        const {...restProps} = this.props
        let date = moment();
        if(newV != '' && newV != undefined && newV != 'undefined'){
          date = moment(newV,format)
        }else{
          let nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
          date = moment(date,format)
        }
        
        return (
            <DatePicker
                {...restProps}
                value={date}
                onChange={(date,dateString)=>this.onChange(date,dateString)}
                // onBlur={(v)=>{this.onChange(v)}}
                >
            </DatePicker>
        );
    }
}

export default NewDatePicker